const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const gameRouter = require('./routes/game.router.js');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** --------- MONGOOSE CONNECTION ----------- */
const databaseUrl = 'mongodb://localhost:27017/gamestore';
mongoose.connect(databaseUrl, {useNewUrlParser: true})


mongoose.connection.once('connected', () => {
    console.log('mongoose connected to', databaseUrl);
})

mongoose.connection.on('error', (err) => {
    console.log('mongoose connection error', err);
})

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/games', gameRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});