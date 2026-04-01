import { useState, useRef, useEffect } from 'react'
import './Chat.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    fetch(`${API_URL}/info`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setInfo(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, top_k: 5 }),
      })
      if (!res.ok) throw new Error(await res.text() || res.statusText)
      const { answer } = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: String(answer ?? '') }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-layout">
      <div className="chat-page">
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-empty">ask me anything</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="chat-msg chat-msg--assistant">...</div>}
        <div ref={bottomRef} />
      </div>
      <form className="chat-form" onSubmit={send}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type something..."
          disabled={loading}
        />
        <button className="chat-send" type="submit" disabled={!input.trim() || loading}>
          send
        </button>
      </form>
    </div>

      {info && (
        <div className="chat-info">
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
        </div>
      )}
    </div>
  )
}
