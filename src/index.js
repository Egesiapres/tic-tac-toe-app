import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// SQUARE: elemento figlio

// STATE
// i componenti React possono avere uno stato impostando this.state nei loro costruttori
// this.state è privato, no accesso
// inserendo constructor(), devo mette anche super() - inizio standard
// this.state fa in modo che Square si ricordi che è stato fatto click
// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

// STATELESS components
// no stato, quindi no classe e si funzione
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// onClick = {function() {console.log('click'); }} e
// onClick = {() => {console.log('click')}}
// è la stessa cosa. Meglio la arrow function =>
// risolve problemi con i this.
// onClick è una props

// {this.props.value} è il ricevitore. Riceve value, la prop presente in Board (l'elemento padre)

// sostituendo {this.props.value} in {this.state.value} visualizziamo il valore corrente dello stato quando clicchiamo il bottone

//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// Board: elemento PADRE

// PROPS
// value è una props. Le prop permettono il passaggio di informazioni fra componenti padre e figlio
// stato condiviso nel componente padre:
// recuperare dati dai componenti figli a partire dal padre o
// far comunicare fra loro due componenti figli
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // slice(): metodo per la copia
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} // la prop onClick è ricevuta da Square
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// f che determina il vincitore
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [3, 4, 5],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
