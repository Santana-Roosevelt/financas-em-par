import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginas/Login'
import Cadastro from './paginas/Cadastro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
