import React, { Component } from 'react';

class GameItem extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.game.title}</td>
                <td>{this.props.game.playTime}</td>
                <td>{this.props.game.numPlayers}</td>
                <td><button onClick={(event) => {this.props.deleteGame(this.props.game._id)}}>Delete</button></td>
                <td><button onClick={(event) => {this.props.editGame(this.props.game)}}>Edit</button></td>
            </tr>
        );
    }
}

export default GameItem;
