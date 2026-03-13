function teste(){
    return true;
}
const express = require('express');
const cors = require('cors');
const livrosRoutes = require('./routes/livros');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas ← MUDE AQUI!
app.use('/livros', livrosRoutes);  // ← Prefixo /livros adicionado

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', mensagem: 'Backend funcionando!' });
});

// Iniciar servidor ← MUDE AQUI!
app.listen(PORT, () => {
  console.log(`📚 Servidor rodando em http://localhost:${PORT}`);  // ← Crases!
});
