const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

// LISTAR TODOS
router.get('/listar_livros', (req, res) => {
  const livros = fileHandler.lerDados();
  res.json(livros);
});

// BUSCAR POR ID
router.get('/listar_livros/:id', (req, res) => {
  const livros = fileHandler.lerDados();
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(livro);
});

// CADASTRAR
router.post('/cadastrar_livros', (req, res) => {
  const livros = fileHandler.lerDados();
  const novoLivro = {
    id: livros.length > 0 ? Math.max(...livros.map(l => l.id)) + 1 : 1,
    ...req.body
  };
  livros.push(novoLivro);
  fileHandler.salvarDados(livros);
  res.json(novoLivro);
});

// ATUALIZAR
router.put('/atualizar_livros/:id', (req, res) => {
  const livros = fileHandler.lerDados();
  const index = livros.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado' });
  
  livros[index] = { id: parseInt(req.params.id), ...req.body };
  fileHandler.salvarDados(livros);
  res.json(livros[index]);
});

// DELETAR
router.delete('/deletar_livros/:id', (req, res) => {
  let livros = fileHandler.lerDados();
  const index = livros.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado' });
  
  livros = livros.filter(l => l.id !== parseInt(req.params.id));
  fileHandler.salvarDados(livros);
  res.json({ mensagem: 'Livro excluído' });
});

module.exports = router;