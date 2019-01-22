const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose Schema
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {type: String, required: true},
    playTime: {type: Number, required: true},
    numPlayers: {type: Number}
})

const Game = mongoose.model('Game', gameSchema)

// Our lovely data
let games = [
    { id: 1, title: 'Risk', playTime: 120, numPlayers: 6 },
    { id: 2, title: 'Borp', playTime: 33, numPlayers: 4 },
    { id: 3, title: 'Orp', playTime: 11, numPlayers: 5 },
];

/// Get Route
router.get('/', (req, res) => {
    // res.send(games);
    Game.find({})
        .then((results) => {
            console.log(results);
            res.send(results);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

/// Find Specific Game
router.get('/find/:title', (req, res) => {
    const titleToFind = req.params.title;  
    
    console.log(titleToFind);
    
    res.send([{ id: 66, title: 'Specific Game', playTime: 45, numPlayers: 2 }]);
});

// Setup a POST route to add a new song to the database
router.post('/', (req, res) => {
    const newGame = req.body;
    // newGame.id = games[games.length - 1].id + 1;
    Game.create(newGame)
        .then((results) => {
            console.log(results);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    
    
});

router.put('/:id', (req, res) => {
    let updatedGame = req.body;
    console.log('update: ', req.body);

    Game.findOneAndUpdate({
        _id: req.params.id
    }, updatedGame)
    .then((results) => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })

    // find game
    // for(let i = 0; i < games.length; i++) {
    //     if (games[i].id == updatedGame.id) {
    //         console.log('found!');
    //         // update
    //         games[i] = updatedGame;
    //     }
    // }

    // res.sendStatus(200);
    
});

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('to delete: ', reqId);
    Game.findOneAndDelete({
        _id: reqId
    })
    .then((results) => { // results is deleted item
        console.log(results);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
    // find game
    // for (let i = 0; i < games.length; i++) {
    //     if (games[i].id == reqId) {
    //         games.splice(i, 1);
    //     }
    // }

    // res.sendStatus(200);
});


module.exports = router;