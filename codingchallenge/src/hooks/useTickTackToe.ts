import { useState, useEffect } from "react";

//create interface for to satisfy type requiremant of hook
interface ReturnValue {
  board: string[];
  status: string;
  winner: string | null;
  //method for handeling click on field
  handleClick: (index: number) => void;
  
  handleRestart: () => void;
  handleStart: (players: string[]) => void;
}
const Ticktacktoe =  (): ReturnValue => {
  //configure set methods for properties
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState("created");
  const [players, setPlayers] = useState(["", ""]);

  useEffect(() => {
    //exit if status is not started
    if (status !== "started") return;

    //define winning positions
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //save index of Winning position
    let winningPositionsIndex = 0;

    let winner: string | null = null;

    //check whether or not a person has won the game 
    while (winningPositionsIndex < winningPositions.length && !winner) {
      const boardPositionsToCheck = winningPositions[winningPositionsIndex];
      //map winning positions eg.:[0,1,2] to boardValuesToCheck
      const boardValuesToCkeck = boardPositionsToCheck.map(
        (index) => board[index]
      );
      const checkingValue = boardValuesToCkeck[0];
      //determine whether or not all objects are the same value and not null 
      const isFinished = boardValuesToCkeck.every(
        //&&checkingvalue makes sure the value is not null
        (value) => value === checkingValue && checkingValue
      );
      //save winner to var if the game is over
      winner = !isFinished ? null : checkingValue;
      //check nex position
      winningPositionsIndex++;
    }

    if (winner) {
      //update state with winner informations
      setWinner(winner === "X" ? players[0] : players[1]);
      setStatus("finished");
      return;
    }
    //update state with new values 
    setStatus(board.filter((value) => !value).length ? "started" : "finished");
  },
  //dependencies of useEffect hook
   [board, players, status]);

  //handels click on field on board
  const handleClick = (index: number): void => {
    if (index < 0 || index > 9 || winner) return;
    //create new board based on input
    const newBoard = [...board];
    //set value at clicked index
    newBoard.splice(index, 1, turn);
    //update state with new board 
    setBoard(newBoard);
    //switch turn and update state
    const newTurn = turn === "X" ? "O" : "X";
    setTurn(newTurn);
  };

  //init game
  const handleStart = (players: string[]) => {
    setPlayers(players);
    setTurn("X");
    setStatus("started");
  };

  //reset state and data
  const handleRestart = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setStatus("created");
  };

  //return processed data
  return { board, status, winner, handleClick, handleRestart, handleStart };
};

export default Ticktacktoe;