const Express = require('express');
const ideasRouter = Express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { 
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
})

 ideasRouter.get('/', (req, res, next) => {       // correct
    const ideas = getAllFromDatabase('ideas')
    res.status(200).send(ideas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {   // correct
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  let updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.delete('/:ideasId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideasId);  //correct
    if (deleted)  {
      res.status(204);
    } else {
      res.status(404);
    }
    res.send();
  });

module.exports = ideasRouter;