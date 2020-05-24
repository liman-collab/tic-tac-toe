import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./Board/Board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Mire se erdhet ne tic-tac-toe</h1>
        <Board />
      </div>
    );
  }
}

export default App;
