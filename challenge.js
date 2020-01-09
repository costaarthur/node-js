const express = require('express');

const server = express();
server.use(express.json());



const projects = []

//MIDDLEWARE GLOBAL//
//Counter
server.use((req, res, next) => {
  console.count("Número de requisições");

  return next();
})

//MIDDLEWARE LOCAL//
// return error if not have id!
function checkIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id)

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next()
}


// GET //
// List all projects

server.get('/projects', (req, res) => {
  return res.json(projects);
})

// GET //
// List 1 project per index //need to fix
server.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  return res.json(projects[id]);
})

// POST //
// Create new project //
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  }
  projects.push(project)
  return res.json(projects)
})

// PUT //
// modify project //
server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETE //
// Delete project //
server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);

  return res.json(projects);
})
// POST 2 //
// Add task insite project//
server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});





server.listen(3100)


// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Arthur", "email": "kaakk@kakak.kaak.ka" }


/*const users = ['Diegão', 'Cláudio', 'Victor'];


//////// esse middleware faz um log depois de cada aquisição
// MIDDLEWARE GLOBAL //
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  return next();

  console.timeEnd('Request');
})


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

server.listen(3000);*/





// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Arthur", "email": "kaakk@kakak.kaak.ka" }

/*server.get('/testou', (req, res) => {
  const email = req.query.email;

  return res.json(`o Email do cidadão é: ${email}`)
})
server.listen(3001)

server.get('/telefone/:telefone', (req, res) => {
  const telefone = req.params.telefone;

  return res.json(`O telefone do jovem é ${telefone}`)
})*/