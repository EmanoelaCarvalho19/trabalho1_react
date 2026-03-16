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
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });
  
  const livros = fileHandler.lerDados();
  const livro = livros.find(l => l.id === id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(livro);
});

// CADASTRAR ✅ COM VALIDAÇÃO
router.post('/cadastrar_livros', (req, res) => {
  const { titulo, autor } = req.body;
  
  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Título e autor são obrigatórios' });
  }
  
  const livros = fileHandler.lerDados();
  const novoLivro = {
    id: livros.length > 0 ? Math.max(...livros.map(l => l.id)) + 1 : 1,
    titulo,
    autor,
    isbn: req.body.isbn || ''
  };
  livros.push(novoLivro);
  fileHandler.salvarDados(livros);
  res.status(201).json(novoLivro);
});

// ATUALIZAR
router.put('/atualizar_livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });
  
  const livros = fileHandler.lerDados();
  const index = livros.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado' });
  
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Título e autor são obrigatórios' });
  }
  
  livros[index] = { 
    id,
    titulo,
    autor,
    isbn: req.body.isbn || ''
  };
  fileHandler.salvarDados(livros);
  res.json(livros[index]);
});

// DELETAR ✅ CORRIGIDO + SEGURO
router.delete('/deletar_livros/:id', (req, res) => {
  try {
    let livros = fileHandler.lerDados();
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    
    const livro = livros.find(l => l.id === id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    
    livros = livros.filter(l => l.id !== id);
    fileHandler.salvarDados(livros);
    res.json({ mensagem: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar:', error);
    res.status(500).json({ erro: 'Erro interno ao deletar livro' });
  }
});

module.exports = router;