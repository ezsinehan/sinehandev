import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import '../App.css'
import './Chat.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function askRag(question) {
  const res = await fetch(`${API_URL}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, top_k: 5 }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const { answer, citations = [] } = await askRag(text)
      const content = answer != null ? String(answer) : ''
      setMessages((prev) => [...prev, { role: 'assistant', content, citations }])
    } catch (err) {
      const message = err.message || 'something went wrong. please try again.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `something went wrong. please try again. (${message})`, citations: [] }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <Link to="/" className="chat-back" aria-label="Back to home">
          ← back
        </Link>
        <h1 className="chat-title">chat(abt sinehan's experience(just about sinehan rag llm for now))</h1>
      </header>

      <div className="chat-messages" role="log" aria-live="polite">
        {messages.length === 0 && (
          <p className="chat-placeholder">
            ask anything about my background, projects, or experience.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message chat-message--${msg.role}`}
            role="listitem"
          >
            <div className="chat-message__content">
              {msg.role === 'assistant' ? (
                <ReactMarkdown>{msg.content != null ? String(msg.content) : ''}</ReactMarkdown>
              ) : (
                msg.content != null ? String(msg.content) : ''
              )}
            </div>
            {msg.role === 'assistant' && msg.citations?.length > 0 && (
              <ul className="chat-citations" aria-label="Sources">
                {msg.citations.map((c, j) => (
                  <li key={j}>
                    {c.section_title} ({c.source_name})
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="chat-citations__link">
                        link
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message chat-message--assistant" aria-busy="true">
            <div className="chat-message__content chat-typing">...</div>
          </div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="visually-hidden">
          your question
        </label>
        <input
          id="chat-input"
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask me anything..."
          disabled={isLoading}
          autoComplete="off"
          aria-describedby="chat-hint"
        />
        <button
          type="submit"
          className="chat-send"
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          send
        </button>
      </form>
      <p id="chat-hint" className="visually-hidden">
        type a question and press send to get an answer about sinehan’s experience
      </p>
    </div>
  )
}
