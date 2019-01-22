import React, { Component } from 'react';

class GameForm extends Component {

    // initial
    state = {
        title: '',
        playTime: '',
        numPlayers: 1,
    };

    // handles edit mode
    componentWillReceiveProps(nextProps) {
        // if we were given a new game object, set it to our state
        if (nextProps.title !== this.props.title) {
            this.setState({
                id: nextProps.id,
                title: nextProps.title,
                playTime: nextProps.playTime,
                numPlayers: nextProps.numPlayers,
            });
        } else {
            this.setState({
                title: '',
                playTime: '',
                numPlayers: 1,
            });
        }
    }

    // Called when the input field changes
    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    }

    // Called when the submit button is pressed
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.editMode) {
            // update game
            console.log('GameForm update ', this.state);
            this.props.updateGame(this.state);
        } else {
            // add
            this.props.addGame(this.state);
        }

        this.clearFields();   
    }

    clearFields = () => {
        this.setState({
            title: '',
            playTime: '',
            numPlayers: 1,
        });

        this.props.cancelEdit();
    }

    render() {
        return (
            <div>
                {/* {JSON.stringify(this.state)} */}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /></label>

                    <label htmlFor="playTime">Play Time (in mins)
                    <input type="text" name="playTime" value={this.state.playTime} onChange={this.handleChange} /></label>

                    <label htmlFor="numPlayers">Number of Players
                    <input type="text" name="numPlayers" value={this.state.numPlayers} onChange={this.handleChange} /></label>

                    {this.props.editMode ?
                        <div>
                            <button onClick={this.handleSubmit}>Update</button>
                            <button onClick={this.clearFields}>Cancel</button>
                        </div>
                        : 
                        <button>Add Game</button>}

                </form>
            </div>
        );
    }
}

export default GameForm;
