const express = require('express');

const server = express();
server.use(express.json());


// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Arthur", "email": "kaakk@kakak.kaak.ka" }


const users = ['Diegão', 'Cláudio', 'Victor'];


//////// esse middleware faz um log depois de cada aquisição
// MIDDLEWARE GLOBAL //
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  return next();

  console.timeEnd('Request');
});

//// middleware local ////
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }
  return next();
}
// middleware check user array
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  req.user = user;
  return next();
}


server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  //return res.json(users[index]);
  return res.json(req.user);
})

// with middleware local
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

// with middleware local
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});


server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);