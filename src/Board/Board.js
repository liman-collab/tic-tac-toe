import React, { Component } from "react";
import "./Board.css";
import Box from "../Box/Box";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentPlayer: 1,
      isGameActive: true,
      draw: false,
      round: 0,
      scores: [],
      winners: [],
    };

    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6], //duhet me kon 1
    ];

    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.filloLojeTeRe = this.filloLojeTeRe.bind(this);
  }

  resetGame() {
    this.setState({
      gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentPlayer: 1,
      isGameActive: true,
      draw: false,
      round: this.state.round + 1,
      //  winners: this.state.winners.push(this.state.currentPlayer),
    });
  }

  filloLojeTeRe() {
    this.setState({
      gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentPlayer: 1,
      isGameActive: true,
      draw: false,
      round: 0,
      scores: [],
      winners: [],
    });
  }

  handleClick(boxIndex) {
    if (this.state.isGameActive) {
      this.setState((prevState) => {
        const newGameState = [...prevState.gameState];
        const currentPlayer = prevState.currentPlayer;
        const nextPlayer = prevState.currentPlayer === 1 ? 2 : 1;
        newGameState[boxIndex] = currentPlayer;
        const score = prevState.scores;
        // console.log(score);
        const winner = this.winningCombinations.reduce(
          (prevValue, combination) => {
            if (
              newGameState[combination[0]] !== 0 &&
              newGameState[combination[0]] === newGameState[combination[1]] &&
              newGameState[combination[1]] === newGameState[combination[2]]
            ) {
              console.log(currentPlayer);

              return currentPlayer;
            } else {
              return prevValue;
            }
          },
          0
        );

        return {
          ...prevState, //qa do qe ka pas nstate-in e vjeter
          isGameActive: winner !== 0 ? false : true,
          currentPlayer: nextPlayer,
          gameState: newGameState,
          draw: winner !== 0 ? false : true,
          score: winner !== 0 && this.state.scores.push(currentPlayer),
        };
      });
    }
  }

  render() {
    const {
      currentPlayer,
      isGameActive,
      gameState,
      draw,
      round,
      scores,
    } = this.state;

    if (round > 2) {
      if (scores.includes(1) > scores.includes(2)) {
        return (
          <div>
            {" "}
            <h1>Loja ka perfunduar dhe fitues eshte X</h1>
            <button onClick={this.filloLojeTeRe}>Fillo lojen e re</button>
          </div>
        );
      } else if (scores.includes(1) < scores.includes(2)) {
        return (
          <div>
            <h1>Loja ka perfunduar dhe fitues eshte Y</h1>
            <button onClick={this.filloLojeTeRe}>Fillo lojen e re</button>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Barazim</h1>
            <button onClick={this.filloLojeTeRe}>Fillo lojen e re</button>
          </div>
        );
      }
    }
    return (
      <div>
        <h2>{this.state.winners}</h2>
        <h2>
          Radhen e lojes e ka lojtari{" "}
          {currentPlayer === 1 ? (
            <i className="fas fa-times" />
          ) : (
            <i className="far fa-circle" />
          )}
        </h2>
        <h2>Loja nr: {round}</h2>

        <div className="boardContainer">
          {gameState.map((box, index) => {
            return (
              <Box
                handleClick={this.handleClick}
                key={index}
                id={index}
                iconValue={box}
              />
            );
          })}
        </div>
        {!gameState.includes(0) && draw && (
          <div>
            <h2>barazim</h2>
            <button onClick={this.resetGame}>Rifillo lojen</button>
          </div>
        )}
        {!isGameActive && (
          <div>
            <h2>
              Fitues eshte Lojtari
              {currentPlayer === 1 ? (
                <i className="far fa-circle" />
              ) : (
                <i className="fas fa-times" />
              )}
            </h2>

            <button onClick={this.resetGame}>Rifillo lojen</button>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
