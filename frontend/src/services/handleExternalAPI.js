import axios from 'axios'

export const buscarCotacoes = async () => {
  try {
    const res = await axios.get(
      'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'
    )

    return {
      ok: true,
      data: res.data,
      time: new Date().toLocaleString('pt-BR')
    }

  } catch (e) {
    return { ok: false, error: e.message }
  }
}