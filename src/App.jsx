import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div style={{
        height: '100vh', // we need to define high so that we can center the text vertically
        display: 'flex', // flexbox display
        alignItems: 'center', // vertical centering
        justifyContent: 'center' // horizontal centering
      }}>
        <div className='portfolio-box'>
          <p className="portfolio-text">sinehan's portfolio is under renovation</p>
        </div>
      </div>

    </>
  )
}

export default App
