import React, { Component } from 'react';
import GameItem from './GameItem';

class GameList extends Component {

  render() {
    return (
        <table>
          <thead>
            <tr> 
              <th>Title</th><th>Play Time</th><th>Num Players</th><th>Options</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.gameList.map( (game) => 
            {
              return <GameItem  key={game.id} 
                                game={game} 
                                deleteGame={this.props.deleteGame} 
                                editGame={this.props.editGame} />
            })
          }
        </tbody>
        </table>
    );
  }
}

export default GameList;
