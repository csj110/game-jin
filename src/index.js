import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
  return (
    <button className={`${props.color} square`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // renderSquare(i,j) {
  //   return (
  //     <Square
  //       value={this.props.squares[i][j]}
  //       onClick={() => this.props.onClick(i,j)}
  //       color={this.props.color[i][j]}
  //     />
  //   );
  // }
  render() {
    // const list1 = [0, 1, 2];
    // const row0=list1.map((item)=>{
    //   return(
    //       this.renderSquare(0,item)
    //   );
    // });
    // const row1=list1.map((item)=>{
    //   return(
    //       this.renderSquare(1,item)
    //   );
    // });
    // const row2=list1.map((item)=>{
    //   return(
    //       this.renderSquare(2,item)
    //   );
    // });

    const sq = this.props.squares.map((item, index1) => {
      // const b=item;
      const list2 = [0, 1, 2];
      const sq1 = item.map((item, index) => {
        return (
            <Square
                key={index}
                value={this.props.squares[index1][index]}
                onClick={() => this.props.onClick(index1, index)}
                color={this.props.color[index1][index]}
            />);
      });

      return (
          <div key={index1} className="board-row">
            {sq1}
          </div>
      );
    });

    return (
        <div>
          {/*<div className="board-row">*/}
          {/*{row0}*/}
          {/*</div>*/}
          {/*<div className="board-row">*/}
          {/*{row1}*/}
          {/*</div>*/}
          {/*<div className="board-row">*/}
          {/*{row2}*/}
          {/*</div>*/}
          {sq}
        </div>
    );
  }

  // render() {
  //   const list1=[0,1,2];
  //   // const row0=list1.map((item)=>{

  //   //   return(
  //   //       this.renderSquare(0,item)
  //   //   );
  //   // });
  //   // const row1=list1.map((item)=>{
  //   //   return(
  //   //       this.renderSquare(1,item)
  //   //   );
  //   // });
  //   // const row2=list1.map((item)=>{
  //   //   return(
  //   //       this.renderSquare(2,item)
  //   //   );
  //   // });
  //
  //   const sq=list1.map((item)=>{
  //     const b=item;
  //     const list2=[0,1,2];
  //     const sq1=list2.map((item)=>{
  //           return(
  //               <Square
  //                   key={item}
  //                   value={this.props.squares[b][item]}
  //                   onClick={() => this.props.onClick(b,item)}
  //                   color={this.props.color[b][item]}
  //               />);
  //         });
  //
  //     return(
  //         <div key={item} className="board-row">
  //         {sq1}
  //         </div>
  //     );
  //   });
  //
  //   return (
  //     <div>
  //       {/*<div className="board-row">*/}
  //         {/*{row0}*/}
  //       {/*</div>*/}
  //       {/*<div className="board-row">*/}
  //         {/*{row1}*/}
  //       {/*</div>*/}
  //       {/*<div className="board-row">*/}
  //         {/*{row2}*/}
  //       {/*</div>*/}
  //       {sq}
  //     </div>
  //   );
  // }

}



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(3).fill(Array(3).fill(null))
      }],
      stepNumber:0,
      xIsNext: true,
      color:Array(3).fill(Array(3).fill(null)),
      color_f:Array(3).fill(Array(3).fill(null)),
      clicked:Array(10).fill(null),
    };
  }

  handleClick(i,j) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares0 = current.squares[0].slice();
    const squares1 = current.squares[1].slice();
    const squares2 = current.squares[2].slice();
    const squares=[squares0,squares1,squares2];
    const color0=this.state.color[0].slice();
    const color1=this.state.color[1].slice();
    const color2=this.state.color[2].slice();
    const color=[color0,color1,color2];
    const clicked=Array(10).fill(null);

    this.setState({
      clicked:clicked,
    });

    if(calculateWinner(squares) || squares[i][j]){
        return
      }
    else {
      squares[i][j] = this.state.xIsNext ? 'X' : 'O';
      if(calculateWinner(squares)){
        const [a,x,b,y,c,z]=calculateWinner(squares);
        color[a][x]='hi';
        color[b][y]='hi';
        color[c][z]='hi';
        this.setState({
          color:color,
          color_f:color,
        });

      };
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  }

  jumpTo(step,max) {
    const clicked=Array(max).fill(null);
    clicked[step]='test';

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
      // color: (max===step)? this.state.color_f:Array(3).fill(Array(3).fill(null)),
      color: (max===step+1)?this.state.color_f:Array(3).fill(Array(3).fill(null)),
      clicked:clicked,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const clicked=this.state.clicked;

    const moves = history.map((step, move) => {
      const max=history.length;
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}　>
          <a className={clicked[move]} href="#" onClick={() => this.jumpTo(move,max)}>{desc}</a>
        </li>
      );
    });
    let status;
    if (winner) {
      const a=winner[0];
      const b=winner[1];
      status = 'Winner: ' + current.squares[a][b];

    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i,j) => this.handleClick(i,j)}
            color={this.state.color}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [[0,0],[1,0] ,[2,0] ],
    [[0,1],[1,1] ,[2,1] ],
    [[0,2],[1,2] ,[2,2] ],
    [[0,0],[0,1] ,[0,2] ],
    [[1,0],[1,1] ,[1,2] ],
    [[2,0],[2,1] ,[2,2] ],
    [[0,0],[1,1] ,[2,2] ],
    [[0,2],[1,1] ,[2,0] ],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [[a,x], [b,y], [c,z]] = lines[i];
    if (squares[a][x] && squares[a][x] === squares[b][y] && squares[a][x] === squares[c][z]) {
      return [a,x,b,y,c,z];
    }
  }
  return null;
}
