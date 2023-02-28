import Square from "../components/square";

interface Props {
  board: string[];
  handleClick(index: number): void;
}
const Game = (props: Props) => {
  const { board, handleClick } = props;
  const styles = {
    //style for ticktacktoe board
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      width: "300px"
    }
  };
  return (
    <div style={styles.board}>
      {/* map all elements on board to squares and return html element */}
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          index={index}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};
export default Game;