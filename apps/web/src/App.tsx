import React from 'react'

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem' }}>💑 Finanças em Par</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
        Servidor rodando com sucesso!
      </p>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '16px 32px',
        borderRadius: '12px',
        color: '#10b981',
        fontWeight: 'bold'
      }}>
        ✅ Frontend conectado
      </div>
    </div>
  )
}

export default App