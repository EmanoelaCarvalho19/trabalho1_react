import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ListBooks from './pages/list/ListBooks'
import CreateBook from './pages/create/CreateBook'
import UpdateBook from './pages/update/UpdateBook'
import DeleteBook from './pages/delete/DeleteBook'

export default function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ListBooks />} />
          <Route path="/listar" element={<ListBooks />} />
          <Route path="/cadastrar" element={<CreateBook />} />
          <Route path="/atualizar/:id" element={<UpdateBook />} />
          <Route path="/deletar/:id" element={<DeleteBook />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}