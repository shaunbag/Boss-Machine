const Express = require('express');
const meetingsRouter = Express.Router();


const { 
    createMeeting,
    getAllFromDatabase,
    deleteAllFromDatabase,
    addToDatabase,
 } = require('./db');

 meetingsRouter.get('/', (req, res, next) => {       // correct
    const meetings = getAllFromDatabase('meetings')
    res.status(200).send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {   // correct
    const newMeeting = addToDatabase('meetings', createMeeting());

    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {            // correct
    res.status(204).send(deleteAllFromDatabase('meetings'));
    
});


module.exports = meetingsRouter;