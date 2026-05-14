import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'

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
        <Route path="/fun" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App
