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
  const params = request.params;

  console.log(params)

  return response.json([
    'Projeto 50',
    'Projeto 20',
    'Projeto 30',
    'Projeto 4',
    'Projeto 5'
  ])
})

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 50',
    'Projeto 20'
  ])
})

app.listen(3000, () => {
  console.log('O servidor está sendo executado...');
});