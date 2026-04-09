import { useState, useRef, useEffect, useCallback } from 'react'
import './Chat.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const PHASES = [
  { label: 'embedding query...', delay: 0 },
  { label: 'searching vectors...', delay: 1500 },
  { label: 'generating response...', delay: 3500 },
]

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState(null)
  const [streamingIdx, setStreamingIdx] = useState(null)
  const [info, setInfo] = useState(null)
  const [infoStatus, setInfoStatus] = useState('connecting') // connecting | loaded | error
  const [prompts, setPrompts] = useState(null)
  const [promptsStatus, setPromptsStatus] = useState('connecting')
  const [expandedFields, setExpandedFields] = useState({})
  const bottomRef = useRef(null)
  const phaseTimers = useRef([])

  useEffect(() => {
    setInfoStatus('connecting')
    fetch(`${API_URL}/info`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText)
        return r.json()
      })
      .then((data) => {
        setInfo(data)
        setInfoStatus('loaded')
      })
      .catch(() => {
        setInfoStatus('error')
      })

    setPromptsStatus('connecting')
    fetch(`${API_URL}/prompts`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText)
        return r.json()
      })
      .then((data) => {
        setPrompts(data)
        setPromptsStatus('loaded')
      })
      .catch(() => {
        setPromptsStatus('error')
      })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleField = useCallback((key) => {
    setExpandedFields((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const TruncatedText = ({ label, text, fieldKey }) => {
    const charLimit = 60
    const isLong = text.length > charLimit
    const expanded = expandedFields[fieldKey]
    return (
      <div className="chat-info__truncated">
        <span className="chat-info__label">{label}</span>
        <span className="chat-info__text">
          {isLong && !expanded ? text.slice(0, charLimit) + '...' : text}
        </span>
        {isLong && (
          <button className="chat-info__expand" onClick={() => toggleField(fieldKey)}>
            {expanded ? 'less' : 'more'}
          </button>
        )}
      </div>
    )
  }

  const startPhases = useCallback(() => {
    setPhase(PHASES[0].label)
    phaseTimers.current = PHASES.slice(1).map((p) =>
      setTimeout(() => setPhase(p.label), p.delay)
    )
  }, [])

  const clearPhases = useCallback(() => {
    phaseTimers.current.forEach(clearTimeout)
    phaseTimers.current = []
    setPhase(null)
  }, [])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)
    startPhases()

    try {
      // Try streaming endpoint first
      const res = await fetch(`${API_URL}/answer/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, top_k: 5 }),
      })

      if (!res.ok) throw { fallback: true }

      // Streaming response — read SSE events
      clearPhases()
      const msgIdx = messages.length + 1 // +1 for the user msg we just added
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
      setStreamingIdx(msgIdx)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() // keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              // Support both { token } and { phase } events
              if (parsed.phase) {
                setPhase(parsed.phase)
              } else if (parsed.token != null) {
                clearPhases()
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[msgIdx] = {
                    ...updated[msgIdx],
                    content: updated[msgIdx].content + parsed.token,
                  }
                  return updated
                })
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      }
      setStreamingIdx(null)
    } catch (err) {
      if (err?.fallback) {
        // Fallback to regular endpoint
        try {
          const res = await fetch(`${API_URL}/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text, top_k: 5 }),
          })
          if (!res.ok) throw new Error(await res.text() || res.statusText)
          const { answer } = await res.json()
          clearPhases()
          setMessages((prev) => [...prev, { role: 'assistant', content: String(answer ?? '') }])
        } catch (fallbackErr) {
          clearPhases()
          setMessages((prev) => [...prev, { role: 'assistant', content: `error: ${fallbackErr.message}` }])
        }
      } else {
        clearPhases()
        setMessages((prev) => {
          // If we already added a streaming message, update it with error
          if (streamingIdx != null) {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'assistant', content: `error: ${err.message}` }
            return updated
          }
          return [...prev, { role: 'assistant', content: `error: ${err.message}` }]
        })
        setStreamingIdx(null)
      }
    } finally {
      setLoading(false)
      clearPhases()
    }
  }

  const apiDown = infoStatus === 'error'

  return (
    <div className="chat-layout">
      <div className="chat-page">
      <div className="chat-wip">still working on feature expect rough edges, in fact expect nothing at all for now..</div>
      <div className="chat-messages">
        {apiDown && (
          <div className="chat-offline">
            <p>the backend is unreachable right now, so my computer is probably off or the tunnel is down. working on a fix for that too</p>
          </div>
        )}
        {!apiDown && messages.length === 0 && (
          <p className="chat-empty">ask me anything</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg chat-msg--${msg.role}${i === streamingIdx ? ' chat-msg--streaming' : ''}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && !streamingIdx && (
          <div className="chat-msg chat-msg--assistant chat-msg--loading">
            <span className="chat-phase">{phase || '...'}</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form className="chat-form" onSubmit={send}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={apiDown ? "chat unavailable..." : "type something..."}
          disabled={loading || apiDown}
        />
        <button className="chat-send" type="submit" disabled={!input.trim() || loading || apiDown}>
          send
        </button>
      </form>
    </div>

      <div className="chat-info">
        <div className="chat-info__status">
          <span className={`chat-info__dot chat-info__dot--${infoStatus}`} />
          {infoStatus === 'connecting' && 'fetching stack...'}
          {infoStatus === 'loaded' && 'stack loaded'}
          {infoStatus === 'error' && 'stack unreachable'}
        </div>
        {info && (
          <>
            <div className="chat-info__section">
              <h3 className="chat-info__heading">stack</h3>
              <p>llm: {info.stack.llm_model}</p>
              <p>embeddings: {info.stack.embedding_model}</p>
              <p>vector db: {info.stack.vector_db}</p>
            </div>
            <div className="chat-info__section">
              <h3 className="chat-info__heading">stats</h3>
              <p>chunks: {info.stats.total_chunks}</p>
              {info.stats.documents.map((doc) => (
                <p key={doc.doc_id}>{doc.source_name} ({doc.chunk_count} chunks)</p>
              ))}
            </div>
            <div className="chat-info__section">
              <h3 className="chat-info__heading">health</h3>
              <p>qdrant: {info.health.qdrant ? 'ok' : 'down'}</p>
              <p>ollama: {info.health.ollama ? 'ok' : 'down'}</p>
            </div>
          </>
        )}

        <div className="chat-info__divider" />

        <div className="chat-info__status">
          <span className={`chat-info__dot chat-info__dot--${promptsStatus}`} />
          {promptsStatus === 'connecting' && 'fetching prompts...'}
          {promptsStatus === 'loaded' && 'prompts loaded'}
          {promptsStatus === 'error' && 'prompts unreachable'}
        </div>
        {prompts && (
          <div className="chat-info__section">
            <h3 className="chat-info__heading">prompts</h3>
            <TruncatedText label="system" text={prompts.system} fieldKey="system" />
            <TruncatedText label="user template" text={prompts.user_template} fieldKey="user_template" />
            <TruncatedText label="no context" text={prompts.no_context} fieldKey="no_context" />
            <p>temperature: {prompts.temperature}</p>
          </div>
        )}
      </div>
    </div>
  )
}
