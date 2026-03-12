import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginas/Login'
import Cadastro from './paginas/Cadastro'
import Casal from './paginas/Casal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/casal" element={<Casal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App