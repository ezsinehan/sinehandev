import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Chat from './pages/Chat'
import About from './pages/About'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function App() {
  useEffect(() => {
    const activeTitle = "sinehan's website"
    const awayTitle = 'was it me😔'

    const syncTitle = () => {
      document.title = document.hidden ? awayTitle : activeTitle
    }

    syncTitle()
    document.addEventListener('visibilitychange', syncTitle)
    return () => document.removeEventListener('visibilitychange', syncTitle)
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Layout>
  )
}

export default App
