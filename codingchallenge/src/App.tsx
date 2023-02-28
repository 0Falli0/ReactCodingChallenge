import Game from "./pages/game";
import Start from "./pages/start";
import Finished from "./pages/finished";
import useTickTackToe from "./hooks/useTickTackToe";

const App = () => {
  // init ticktacktoe hook
  const game = useTickTackToe();
  return (
    <div className="App">
      {/* display page based on status also add hook to elements*/}
      {game.status === "created" && <Start handleStart={game.handleStart} />}
      {game.status === "finished" && (
        <Finished name={game.winner} restart={game.handleRestart} />
      )}
      {game.status === "started" && (
        <Game board={game.board} handleClick={game.handleClick} />
      )}
    </div>
  );
};
export default App;