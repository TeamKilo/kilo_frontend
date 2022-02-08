import JoinGame from "./JoinGame";
import CreateGame from "./CreateGame";
import { useNavigate } from "react-router-dom";

function Menu(props) {
    let navigate = useNavigate();

    return (
        <div className="d-grid gap-2">
            <JoinGame onJoin={id => navigate("/view/" + id)} />
            <button type="button" className="btn btn-primary" onClick={() => navigate("/list")}>List Games</button>
            <CreateGame onCreated={id => navigate("/view/" + id)} />
        </div>
    );
}

export default Menu;
