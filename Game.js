import React, {Component} from 'react';
import Board from './Board';

class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext: (step%2)===0
        })
    }


    handleClick(i){
        const history= this.state.history.slice(0, this.state.stepNumber+1);
        const current= history[history.length-1];
       
        const squares= current.squares.slice();
        const winner= getWinner(squares);
        if (winner || squares[i]){
            return;
        }
        squares[i]= this.state.xIsNext?'X':'O';

        this.setState({
            history:history.concat({
                squares:squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber:history.length
        });
        
    }
    render(){
        const history= this.state.history;
        const current= history[this.state.stepNumber];
        const winner=getWinner(current.squares);
        const moves=history.map((step, move)=>{
            const desc= move? ''+ move: 'Start game';
            return(
                <li key={move}>
                    <button onClick={()=>{this.jumpTo(move)}}>
                        {desc}
                    </button>

                </li>
            )
        });
        let status;
        if (winner){
            status= winner +" is the winner!";
        }
        else{
            status="Next to play is "+ (this.state.xIsNext?'X':'O');
        }
        return(
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i)=>this.handleClick(i)}
                    squares={current.squares}/>
                </div>
                <div classname="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>

        )
    }
}

function getWinner(squares){

    const win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]

        

    ];
    for(let i=0; i<win.length; i++){
        const[x,y,z]=win[i];
        if (squares[x]&& squares[x]===squares[y] && squares[y]===squares[z]){
            return squares[x];
        }
    }



    return null;

}
export default Game;
