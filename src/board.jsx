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
            winner: "",
        }
        this.resetBoard = this.resetBoard.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateWinnerBoard = this.updateWinnerBoard.bind(this);
        this.markBoard = this.markBoard.bind(this);
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.turnCount !== this.state.turnCount && prevState.gameOver === false){
            this.checkWinner();
        }
    }

    markBoard(e){
        let space = e.currentTarget.dataset.index.split("-");
        if (this.state.board[parseInt(space[0])][parseInt(space[1])] === -1) {
            e.target.innerHTML = this.state.players[this.state.turnCount % 2];
            let new_board = JSON.parse(JSON.stringify(this.state.board));
            new_board[parseInt(space[0])][parseInt(space[1])] = this.state.players[this.state.turnCount % 2];
            e.target.classList.add('click');
            this.setState({
                board: new_board,
                turnCount: this.state.turnCount + 1,
            });
        }
    }


    handleClick(e){
        this.checkWinner();
        if (!this.state.gameOver){
            if(e.currentTarget.dataset.index){
                this.markBoard(e);
            }
        }
    }


    resetBoard(){
        let td_space = document.querySelectorAll(`td[data-index]`);
        td_space.forEach(space => {
            space.classList.remove('winner');
            space.classList.remove('inactive');
        });
        let spaces = document.querySelectorAll('.space');
        spaces.forEach(space=> {
            space.classList.remove('click');
        })
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

    updateWinnerBoard(arr){
        arr.forEach(cord => {
            document.querySelector(`td[data-index='${cord}']`).classList.add("winner");
        });
        let td_space = document.querySelectorAll(`td[data-index]`);
        td_space.forEach(space => {
            space.classList.add('inactive');
        });

    }

    checkWinner() {
        let winner = null;
        let diagonal = checkDiagonalWinner(this.state.board);
        let col = checkColWinner(this.state.board);
        let coordinates;
        if (diagonal) {
            winner = diagonal;
        } else if (col) {
            winner = col;
        } else {
            for (let i = 0; i < this.state.board.length; i++) {
                if (checkRowWinner(this.state.board[i])) {
                    winner = [`${i}-0`, `${i}-1`, `${i}-2`];
                }
            }
        }
        if (winner) {
            if (this.state.gameOver === false) {
                coordinates = winner[0].split("-");
                this.updateScore(this.state.board[coordinates[0]][coordinates[1]]);
                this.updateWinnerBoard(winner);
            }
            this.setState({
               gameOver: true
            });
        } else if (this.state.turnCount === 9 && this.state.gameOver === false) {
            this.setState({
                gameOver: true
            });
        }

    }



    render(){
        let turnDisplay;
        if (this.state.gameOver === true){
            turnDisplay = <h2 id="turn">{this.state.winner === "" ? "Draw Game" : `${this.state.winner} WINS!`}</h2>
        }else{
            turnDisplay = <h2 id="turn">Turn: {this.state.players[this.state.turnCount % 2]}</h2>;
        }


        return (
            <div className="gamePage">
                <h1>Tic Tac Toe</h1>
                <div className="scoreBoard">
                    <h2 id="xScore"><strong id="x">X:</strong> {this.state.score["X"]}</h2>
                    <h2 id="oScore"><strong id="o">O:</strong> {this.state.score["O"]}</h2>
                </div>
                <div className="turnContainer">
                    {turnDisplay}
                </div>
                <table id="board">
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
                <div className="buttonRow">
                    <button onClick={this.resetBoard}>Reset Board</button>
                    <button onClick={this.resetScore}>Reset Scores</button>
                </div>
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
        return true;
    }
    return false;
}
function checkColWinner(board) {
    let copyBoard = transpose(board)
    for (let i = 0; i < board.length; i++) {
        if (checkRowWinner(copyBoard[i])) {
            return [`0-${i}`, `1-${i}`, `2-${i}`];

        }
    }
    return false;
}

function checkDiagonalWinner(board) {
    if (board[1][1] === -1) return false;
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        return ["0-0", "1-1", "2-2"];
    }else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return ["0-2", "1-1", "2-0"];
    }
    return false;
}



export default Board;