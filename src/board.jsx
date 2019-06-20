import React from 'react';
import Space from './space';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: ["X","O"],
            board: [
                [-1,-1,-1],
                [-1,-1,-1],
                [-1,-1,-1]
            ],
            turnCount: 0,
            score: {
                    "X": 0,
                    "O": 0   
                    },
            gameOver: false
        }
        this.resetBoard = this.resetBoard.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        // console.log(this.state.board);
        // console.log(e.target);
        if (!this.state.gameOver){
            console.log(e.currentTarget);
            if(e.currentTarget.dataset.index){
                let space = e.currentTarget.dataset.index.split("-");
                // console.log("CLICK");
                console.log(this.state.board[parseInt(space[0])][parseInt(space[1])]);
                if (this.state.board[parseInt(space[0])][parseInt(space[1])] === -1) {
                    e.target.innerHTML = this.state.players[this.state.turnCount % 2];
                    let new_board = JSON.parse(JSON.stringify(this.state.board));
                    new_board[parseInt(space[0])][parseInt(space[1])] = this.state.players[this.state.turnCount % 2];
                    // console.log(e.target);
                    e.target.classList.add('click');
                    this.setState({
                        board:new_board,
                        turnCount: this.state.turnCount+1,
                    });
                }
            }
        }
    }

    resetBoard(){
        this.setState({
            board: [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ],
            turnCount: 0,
            gameOver: false
        });
    }

    resetScore(){
        this.setState({
            score:{
                "X": 0,
                "O": 0  
            }
        })
    }

    render(){

        return (
            <div className="board">
                <h1>Tic Tac Toe</h1>
                <h2 id="xScore">X: {this.state.score["X"]}</h2>
                <h2 id="oScore">O: {this.state.score["O"]}</h2>
                <h3 id="status">Winner: </h3>
                <table id="board">
                    <thead>
                        <tr>
                            <th>Turn:</th>
                            <th id="turn">{this.state.players[this.state.turnCount % 2]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-index="0-0" onClick={this.handleClick}><Space value={this.state.board[0][0]}/></td>
                            <td data-index="0-1" onClick={this.handleClick}><Space value={this.state.board[0][1]} /></td>
                            <td data-index="0-2" onClick={this.handleClick}><Space value={this.state.board[0][2]} /></td>
                        </tr>
                        <tr>
                            <td data-index="1-0" onClick={this.handleClick}><Space value={this.state.board[1][0]} /></td>
                            <td data-index="1-1" onClick={this.handleClick}><Space value={this.state.board[1][1]} /></td>
                            <td data-index="1-2" onClick={this.handleClick}><Space value={this.state.board[1][2]} /></td>
                        </tr>
                        <tr>
                            <td data-index="2-0" onClick={this.handleClick}><Space value={this.state.board[2][0]} /></td>
                            <td data-index="2-1" onClick={this.handleClick}><Space value={this.state.board[2][1]} /></td>
                            <td data-index="2-2" onClick={this.handleClick}><Space value={this.state.board[2][2]} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Board;