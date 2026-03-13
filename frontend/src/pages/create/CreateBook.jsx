import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/handleBooks'

export default function CreateBook() {
    const [form, setForm] = useState({ titulo: '', autor: '', isbn: '' })
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await api.criar(form)

        if (res.ok) {
            setMsg('✅ Salvo!')
            setTimeout(() => navigate('/listar'), 1500)
        } else {
            setMsg('❌ Erro: ' + res.error)
        }
        setLoading(false)
    }

     return (
        <div className="page">

            <h2>➕ Cadastrar Livro</h2>
   
           
            {msg && <p className={`mensagem ${msg.includes('✅') ? 'sucesso' : 'erro'}`}>{msg}</p>}
            <form onSubmit={submit} className="formulario">
                <label>Título<input type="text" name="titulo" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required /></label>
                <label>Autor<input type="text" name="autor" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} required /></label>
                <label>ISBN<input type="text" name="isbn" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} /></label>
                <div className="botoes">
                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Salvando...' : '💾 Salvar'}</button>
                    <button type="button" onClick={() => navigate('/listar')} className="btn btn-secondary">↩️ Voltar</button>
                </div>
            </form>
        </div>
    )
}