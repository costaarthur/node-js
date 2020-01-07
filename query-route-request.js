const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { }


server.get('/teste', (req, res) => {
  const { nome } = req.query;
  return res.json({ message: `Eaaa ${nome}` });
})

/*server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscando o usuário ${id}` });
})*/

const users = ['Diegão', 'Cláudio', 'Victor'];

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
})



server.listen(3000);