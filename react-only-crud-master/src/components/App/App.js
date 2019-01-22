import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import GameList from '../GameList/GameList';
import GameForm from '../GameForm/GameForm';

class App extends Component {

  state = {
    gameList: [],
    editMode: false,
    editGame: null,
  }

  componentDidMount() {
    this.getGames();
  }

  addGame = (newGame) => {
    console.log(newGame);
    axios.post('/games', newGame)
      .then((response) => {
        this.getGames();
      })
      .catch((error) => {
        alert('Error on Post', error);
      });
  }

  getGames = () => {
    axios.get('/games')
      .then((response) => {
        this.setState({
          gameList: response.data
        });
      })
      .catch((error) => {
        alert('Error on Get', error);
      });
  }

  deleteGame = (gameId) => {
    console.log('delete gameid: ', gameId);

    axios.delete(`/games/${gameId}`)
      .then((response) => {
        this.getGames();
      })
      .catch((error) => {
        alert('Error on Delete', error);
      });
  }

  // sets the App to edit mode for an existing game
  // this updates the GameForm component to show the given existing game to edit
  editGame = (game) => {
    console.log('app editGame', game);

    this.setState({
      editMode: true,
      editGame: game,
    });
  }

  // turn edit mode off
  cancelEdit = () => {
    this.setState({
      editMode: false,
      editGame: null
    });
  }

  // PUT updated game data to server
  updateGame = (game) => {
    console.log('updated game to server: ', game);
    if(game) {
      axios.put(`/games/${game.id}`, game)
        .then((response) => {
          this.getGames();
        })
        .catch((error) => {
          alert('Error on Put', error);
        });
    } else {
      this.cancelEdit();
    }
  }

  // Render is called everytime state changes
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Games!</h1>
        </header>
        {this.state.editMode ?
          // this is for edit mode
          <GameForm addGame={this.addGame} editMode={this.state.editMode}
            updateGame={this.updateGame}
            cancelEdit={this.cancelEdit}
            // data follows
            cancelEdit={this.updateGame}
            id={this.state.editGame.id}
            title={this.state.editGame.title}
            playTime={this.state.editGame.playTime}
            numPlayers={this.state.editGame.numPlayers} />
          :
          // new/add mode
          <GameForm addGame={this.addGame} editMode={this.state.editMode} cancelEdit={this.cancelEdit} />
        }

        <GameList gameList={this.state.gameList}
          deleteGame={this.deleteGame}
          editGame={this.editGame} />

      </div>
    );
  }
}

export default App;
