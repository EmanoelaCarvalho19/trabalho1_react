import axios from 'axios'
const API = 'http://localhost:3001/livros'

export const api = {
  listar: async () => {
    try {
      const res = await axios.get(`${API}/listar_livros`)
      return { ok: true, data: res.data }
    } catch (e) { return { ok: false, error: e.message } }
  },
  buscar: async (id) => {
    try {
      const res = await axios.get(`${API}/listar_livros/${id}`)
      return { ok: true, data: res.data }
    } catch (e) { return { ok: false, error: e.message } }
  },
  criar: async (livro) => {
    console.log('Criando livro:', livro)
    try {
      const res = await axios.post(`${API}/cadastrar_livros`, livro)
      return { ok: true, data: res.data }
    } catch (e) { return { ok: false, error: e.message } }
  },
  atualizar: async (id, livro) => {
    try {
      const res = await axios.put(`${API}/atualizar_livros/${id}`, livro)
      return { ok: true, data: res.data }
    } catch (e) { return { ok: false, error: e.message } }
  },
  deletar: async (id) => {
    try {
      const res = await axios.delete(`${API}/deletar_livros/${id}`)
      return { ok: true, data: res.data }
    } catch (e) { return { ok: false, error: e.message } }
  }
}