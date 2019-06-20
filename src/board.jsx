import React from 'react';

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
                <h2 id="xScore">X: </h2>
                <h2 id="oScore">O: </h2>
                <h3 id="status">Winner: </h3>
                <table id="board">
                    <thead>
                        <tr>
                            <th>Turn:</th>
                            <th id="turn"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-index="0-0"> </td>
                            <td data-index="0-1"> </td>
                            <td data-index="0-2"> </td>
                        </tr>
                        <tr>
                            <td data-index="1-0"> </td>
                            <td data-index="1-1"> </td>
                            <td data-index="1-2"> </td>
                        </tr>
                        <tr>
                            <td data-index="2-0"> </td>
                            <td data-index="2-1"> </td>
                            <td data-index="2-2"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Board;