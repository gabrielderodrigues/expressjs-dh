const express = require('express');
const { v4:uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const projects = [];
/* 
  Query Params: Vamos usar principalmente para filtros e paginação
  Router Params: Identificar recursos na hora de atualizar ou deletar
  Request Body: Resto do conteúdo na hora de criar ou editar um recurso 
*/

app.get('/projects', (request, response) => {
  return response.json(projects);
});

/* GET: Buscar informações no back-end
   POST: criar uma informação no back-end
   PUT/PATCH: Alterar uma informação no back-end
   DELETE: Deletar informações no back-end
*/

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuidv4(), title, owner };

  console.log(project.id)

  projects.push(project); //esse push vai jogar a criação do nosso projeto para o nosso array

  return response.json(project); //sempre retornar o projeto recem criado e nunca exibir a lista completa 
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params; // aqui pegamos nosso ID
  const { title, owner } = request.body; //retornando uma nova informação

  // aqui umas o findIndex para percorrer todo o array atrás do ID
  // findIndex vai percorrer todos os projetos, e toda vez que ele percorrer na variavel project caso ela satisfeita e retornar true, ela vai me retornar o ID que estou passando.

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Projeto não foi encontrado' });
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Projeto não foi encontrado' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
})

app.listen(3000, () => {
  console.log('O servidor está sendo executado...');
});