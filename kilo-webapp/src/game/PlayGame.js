import { useParams } from "react-router-dom";
import Game from "./Game";

function PlayGame(props) {
    let params = useParams();
    const gameID = params.gameid;
    const sessionID = params.sessionid;

    return <Game gameID={gameID} playing={true} sessionID={sessionID} />;
}

export default PlayGame;
