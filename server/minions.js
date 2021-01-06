const Express = require('express');
const minionsRouter = Express.Router()

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
 } = require('./db');

 minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
      req.minion = minion;
      next();
  } else {
      res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {       // correct
    const minions = getAllFromDatabase('minions')
    res.status(200).send(minions);
});

minionsRouter.post('/', (req, res, next) => {   // correct
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => { 
    res.send(req.minion);
});


minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinion = updateInstanceInDatabase('minions', req.body)                    // incorrect
  res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);          //correct
  if (deleted)  {
    res.status(204);
  } else {
    res.status(404);
  }
  res.send();
});



minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
      req.work = work;
      next();
  } else {
      res.status(404).send();
  }
});


minionsRouter.get('/:minionId/work', (req, res, next) => {
  const allWork = getAllFromDatabase('work').filter(workload => {
    return workload.id === req.params.minionId
  })
  res.status(200).send(allWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if(req.params.minionId !== req.body.minionId){
    res.status(400).send()
  } else {
  const updatedWork = updateInstanceInDatabase('work', req.body);
  res.send(updatedWork);
  }
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = addToDatabase('work', req.body);
  res.status(201).send(newWork);
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('work', req.params.workId);          //correct
  if (deleted)  {
    res.status(204);
  } else {
    res.status(404);
  }
  res.send();
})



module.exports = minionsRouter;