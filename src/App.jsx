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
        <p style={{ fontFamily: 'Kavivanar, cursive'}}>sinehan's portfolio is under renovation</p>
      </div>

    </>
  )
}

export default App
