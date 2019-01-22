const express = require('express');
const router = express.Router();

// Our lovely data
let games = [
    { id: 1, title: 'Risk', playTime: 120, numPlayers: 6 },
    { id: 2, title: 'Borp', playTime: 33, numPlayers: 4 },
    { id: 3, title: 'Orp', playTime: 11, numPlayers: 5 },
];

/// Get Route
router.get('/', (req, res) => {
    res.send(games);
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
    newGame.id = games[games.length - 1].id + 1;
    console.log(newGame);

    games.push(newGame);
    
    res.sendStatus(201);
});

router.put('/:id', (req, res) => {
    let updatedGame = req.body;
    console.log('update: ', req.body);
    // find game
    for(let i = 0; i < games.length; i++) {
        if (games[i].id == updatedGame.id) {
            console.log('found!');
            // update
            games[i] = updatedGame;
        }
    }

    res.sendStatus(200);
    
});

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('to delete: ', reqId);
    
    // find game
    for (let i = 0; i < games.length; i++) {
        if (games[i].id == reqId) {
            games.splice(i, 1);
        }
    }

    res.sendStatus(200);
});


module.exports = router;