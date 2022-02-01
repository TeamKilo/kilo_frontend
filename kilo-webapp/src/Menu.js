import JoinGame from "./JoinGame";

function Menu(props) {
  return (
    <div className="d-grid gap-2">
      <JoinGame
        joinGame = {props.joinGame}
      />
      <button type="button" className="btn btn-primary">Button</button>
    </div>
  );
}

export default Menu;