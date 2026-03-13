const fs = require('fs');
const path = require('path');

const ARQUIVO = path.join(__dirname, '../data/livros.json');

// Garante que o arquivo existe
if (!fs.existsSync(ARQUIVO)) {
  fs.writeFileSync(ARQUIVO, '[]', 'utf8');
}

module.exports = {
  lerDados: () => {
    try {
      const dados = fs.readFileSync(ARQUIVO, 'utf8');
      return JSON.parse(dados);
    } catch (e) {
      return [];
    }
  },
  salvarDados: (dados) => {
    fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
  }
};