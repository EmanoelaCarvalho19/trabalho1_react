import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/handleBooks'

export default function DeleteBook() {
  const { id } = useParams()
  const [livro, setLivro] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.buscar(id).then(res => { if (res.ok) setLivro(res.data); setLoading(false) })
  }, [id])

  const confirmar = async () => {
    const res = await api.deletar(id)
    if (res.ok) { setMsg('✅ Excluído!'); setTimeout(() => navigate('/listar'), 1500) }
    else { setMsg('❌ Erro: ' + res.error) }
  }

  if (loading) return <div className="page"><div className="loading">Carregando...</div></div>
  if (!livro) return <div className="page"><p>Livro não encontrado.</p></div>

  return (
    <div className="page">
      <h2>🗑️ Confirmar Exclusão</h2>
      {msg && <p className={`mensagem ${msg.includes('✅') ? 'sucesso' : 'erro'}`}>{msg}</p>}
      <div className="text-center">
        <p>Tem certeza que deseja excluir?</p>
        <div style={{background:'#f8f9fa',padding:'20px',borderRadius:'8px',margin:'20px 0',textAlign:'left'}}>
          <strong>📖 {livro.titulo}</strong><br/>
          Autor: {livro.autor}<br/>
          {livro.isbn && `ISBN: ${livro.isbn}`}
        </div>
        <div className="botoes">
          <button onClick={confirmar} className="btn btn-delete">✅ Confirmar</button>
          <button onClick={() => navigate('/listar')} className="btn btn-secondary">↩️ Cancelar</button>
        </div>
      </div>
    </div>
  )
}