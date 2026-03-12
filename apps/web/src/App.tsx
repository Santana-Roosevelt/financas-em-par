import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginas/Login'
import Cadastro from './paginas/Cadastro'
import Casal from './paginas/Casal'
import Dashboard from './paginas/Dashboard'
import Despesas from './paginas/Despesas'
import Cartoes from './paginas/Cartoes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/casal" element={<Casal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/despesas" element={<Despesas />} />
        <Route path="/cartoes" element={<Cartoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App