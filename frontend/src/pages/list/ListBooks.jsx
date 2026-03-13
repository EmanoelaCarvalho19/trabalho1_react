import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/handleBooks'
import { buscarCotacoes } from '../../services/handleExternalAPI'

export default function ListBooks() {
  const [livros, setLivros] = useState([])
  const [cotacoes, setCotacoes] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarTudo()
  }, [])

  const carregarTudo = async () => {
    const [livrosRes, cotacoesRes] = await Promise.all([api.listar(), buscarCotacoes()])
    if (livrosRes.ok) setLivros(livrosRes.data)
    else setMsg('❌ Erro: ' + livrosRes.error)
    if (cotacoesRes.ok) setCotacoes(cotacoesRes)
    setLoading(false)
  }


  const cotacao = async () => {
    try {
      const res = await buscarCotacoes()

      if (res.ok) {
        setCotacoes(res)
      } else {
        console.error(res.error)
      }

    } catch (e) {
      console.error('Erro ao buscar cotações:', e)
    }
  }

  if (loading) return <div className="page"><div className="loading">Carregando...</div></div>

  return (
    <div className="page">
      <h2>📋 Lista de Livros</h2>
      <button onClick={cotacao}>💡 buscar cotacao </button>

      {cotacoes && (
        <section className="cotacoes">
          <h3>💱 Cotações</h3>
          <div className="cards-cotacao">
            <div className="card">
              <strong>Dólar</strong>
              <p>R$ {parseFloat(cotacoes.data.USDBRL.bid).toFixed(2)}</p>
              <small className={parseFloat(cotacoes.data.USDBRL.pctChange) >= 0 ? 'positivo' : 'negativo'}>
                {cotacoes.data.USDBRL.pctChange}%
              </small>
            </div>
            <div className="card">
              <strong>Euro</strong>
              <p>R$ {parseFloat(cotacoes.data.EURBRL.bid).toFixed(2)}</p>
              <small className={parseFloat(cotacoes.data.EURBRL.pctChange) >= 0 ? 'positivo' : 'negativo'}>
                {cotacoes.data.EURBRL.pctChange}%
              </small>
            </div>
            <div className="card">
              <strong>Bitcoin</strong>
              <p>R$ {parseFloat(cotacoes.data.BTCBRL.bid).toFixed(2)}</p>
              <small className={parseFloat(cotacoes.data.BTCBRL.pctChange) >= 0 ? 'positivo' : 'negativo'}>
                {cotacoes.data.BTCBRL.pctChange}%
              </small>
            </div>
          </div>
          <small className="text-center mt-20">🕐 {cotacoes.time}</small>
        </section>
      )}

      {msg && <p className="mensagem erro">{msg}</p>}

      {livros.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro cadastrado.</p>
          <Link to="/cadastrar" className="btn btn-primary mt-20">Cadastrar</Link>
        </div>
      ) : (
        <table className="tabela">
          <thead>
            <tr><th>ID</th><th>Título</th><th>Autor</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {livros.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.titulo}</td>
                <td>{l.autor}</td>
                <td className="acoes">
                  <Link to={`/atualizar/${l.id}`} className="btn btn-edit">✏️</Link>
                  <Link to={`/deletar/${l.id}`} className="btn btn-delete">🗑️</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-center mt-20">
        <button onClick={carregarTudo} className="btn btn-primary">🔄 Atualizar</button>
      </div>
    </div>
  )
}