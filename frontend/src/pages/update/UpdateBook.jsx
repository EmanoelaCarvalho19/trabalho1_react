import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/handleBooks'

export default function UpdateBook() {
  const { id } = useParams()
  const [form, setForm] = useState({ titulo: '', autor: '', isbn: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.buscar(id).then(res => { if (res.ok) setForm(res.data); setLoading(false) })
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const res = await api.atualizar(id, form)
    if (res.ok) { setMsg('✅ Atualizado!'); setTimeout(() => navigate('/listar'), 1500) }
    else { setMsg('❌ Erro: ' + res.error) }
    setSaving(false)
  }

  if (loading) return <div className="page"><div className="loading">Carregando...</div></div>

  return (
    <div className="page">
      <h2>✏️ Atualizar Livro</h2>
      {msg && <p className={`mensagem ${msg.includes('✅') ? 'sucesso' : 'erro'}`}>{msg}</p>}
      <form onSubmit={submit} className="formulario">
        <label>Título<input type="text" name="titulo" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} required /></label>
        <label>Autor<input type="text" name="autor" value={form.autor} onChange={e => setForm({...form, autor: e.target.value})} required /></label>
        <label>ISBN<input type="text" name="isbn" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} /></label>
        <div className="botoes">
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Salvando...' : '💾 Atualizar'}</button>
          <button type="button" onClick={() => navigate('/listar')} className="btn btn-secondary">↩️ Cancelar</button>
        </div>
      </form>
    </div>
  )
}