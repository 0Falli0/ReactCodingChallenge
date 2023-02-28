import { useState, useMemo, FormEvent } from "react";
interface Props {
  handleStart(players: string[]): void;
}
const Start = (props: Props) => {

  const { handleStart } = props;
  
  //set state property of players
  const [players, setPlayers] = useState(["", ""]);

  //get input from html
  const handleInput = (event: FormEvent<HTMLInputElement>, index: number) => {
    //copy array
    const newPlayers = [...players];
    //set player in array
    newPlayers.splice(index, 1, event.currentTarget.value);
    //update state
    setPlayers(newPlayers);
  };
  //useMemo gets called whenever dependencies change(dep = players)
  // attention this needs to be within an array
  const canStart = useMemo(
    () => players.every((player) => player && player.length > 0),
    [players]
  );

  // handle html input element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //prevent default action of html event
    event.preventDefault();
    //if canStart is false prevent start(player1 or player2 is empty)
    if (!canStart) return;
    //start game with players
    handleStart(players);
  };
  // export html element
  return (
    <div>
      <h1>React Tic Tac Toe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            value={players[0]}
            onInput={(e) => handleInput(e, 0)}
          />
        </div>
        <div>
          <label htmlFor="player2">Player 2</label>
          <input
            type="text"
            value={players[1]}
            onInput={(e) => handleInput(e, 1)}
          />
        </div>
        <div>
          <button type="submit" disabled={!canStart}>
            Start
          </button>
        </div>
      </form>
    </div>
  );
};
export default Start;