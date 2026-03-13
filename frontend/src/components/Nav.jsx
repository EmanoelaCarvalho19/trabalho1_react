import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/listar">📋 Listar</Link>
      <Link to="/cadastrar">➕ Cadastrar</Link>
    </nav>
  )
}