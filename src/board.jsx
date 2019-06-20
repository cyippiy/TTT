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
            gameOver: false,
            winner: ""
        }
        this.resetBoard = this.resetBoard.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.status = document.querySelector("#status");
        this.updateScore = this.updateScore.bind(this);
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.turnCount !== this.state.turnCount){
            this.checkWinner();
        }
    }

    handleClick(e){
        // console.log(this.state.board);
        // console.log(e.target);
        this.checkWinner();
        if (!this.state.gameOver){
            // console.log(e.currentTarget);
            if(e.currentTarget.dataset.index){
                let space = e.currentTarget.dataset.index.split("-");
                // console.log("CLICK");
                // console.log(this.state.board[parseInt(space[0])][parseInt(space[1])]);
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
                    this.checkWinner();
                }
            }
        }
    }

    resetBoard(){
        let spaces = document.querySelectorAll('.space');
        spaces.forEach(space => {
            space.classList.remove('click')
        });
        this.setState({
            board: [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ],
            turnCount: 0,
            gameOver: false,
            winner: ""
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

    updateScore(winner){
        this.setState({
            score:{
                "X": winner === "X" ? this.state.score["X"]+1 : this.state.score["X"],
                "O": winner === "O" ? this.state.score["O"]+1 : this.state.score["O"],
            },
            winner
        })
    }

    checkWinner() {
        let winner = null;
        let diagonal = checkDiagonalWinner(this.state.board);
        let col = checkColWinner(this.state.board);

        if (diagonal) {
            winner = diagonal;
        } else if (col) {
            winner = col;
        } else {
            for (let i = 0; i < this.state.board.length; i++) {
                let row = checkRowWinner(this.state.board[i])
                if (row) {
                    winner = row;
                }
            }
        }
        // let status = document.querySelector("#status");
        if (winner) {
            if (this.state.gameOver === false) {
                // this.status.innerHTML += winner;
                // this.status.classList.toggle('active');
                // turnStatus.innerHTML = " ";
                // score[winner]++;
                // updateScore();
                this.updateScore(winner);
            }
            this.setState({
               gameOver: true
            });
        } else if (this.state.turnCount === 9 && this.state.gameOver === false) {
            this.setState({
                gameOver: true
            });
            // this.status.innerHTML = "DRAW GAME"
            // this.status.classList.toggle('active');
            // status.classList.add('draw');
            // turnStatus.innerHTML = " ";
            
        }

    }



    render(){
        let turnDisplay;
            if (this.state.gameOver === true){
                let winner
                turnDisplay = <tr><th>{this.state.winner === "" ? "Draw Game" : `${this.state.winner} WINS!`}</th></tr>
            }else{
                    turnDisplay = <tr><th>Turn:</th><th id="turn">{this.state.gameOver === true ? " " : this.state.players[this.state.turnCount % 2]}</th></tr>;
            }


        return (
            <div className="board">
                <h1>Tic Tac Toe</h1>
                <h2 id="xScore">X: {this.state.score["X"]}</h2>
                <h2 id="oScore">O: {this.state.score["O"]}</h2>
                <h3 id="status">Winner: </h3>
                <table id="board">
                    <thead>
                        <tr>
                            {turnDisplay}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-index="0-0" onClick={this.handleClick}><Space value={this.state.board[0][0]} /></td>
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
                <button onClick={this.resetBoard}>Reset Board</button>
                <button onClick={this.resetScore}>Reset Scores</button>
            </div>
        )
    }
}

//credit to https://stackoverflow.com/users/583651/fawad-ghafoor
function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function checkRowWinner(arr) {
    if (arr[0] === -1) return false;
    if (arr[0] === arr[1] && arr[1] === arr[2]) {
        return arr[0];
    }
    return false;
}
function checkColWinner(board) {
    let copyBoard = transpose(board)
    for (let i = 0; i < board.length; i++) {
        let temp = checkRowWinner(copyBoard[i]);
        if (temp) {
            return temp;
        }
    }
    return false;
}

function checkDiagonalWinner(board) {
    if (board[1][1] === -1) return false;
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) || (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
        return board[1][1];
    }
    return false;
}


export default Board;