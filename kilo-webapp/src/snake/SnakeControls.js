function SnakeControls(props) {
    return (
        <>
            <button type="button" className="btn btn-primary" style={{width: "2.5em"}} onClick={() => props.submitMove("up")}>↑</button>
            <br />
            <button type="button" className="btn btn-primary" style={{width: "2.5em", marginRight: "1.25em"}} onClick={() => props.submitMove("left")}>←</button>
            <button type="button" className="btn btn-primary" style={{width: "2.5em", marginLeft: "1.25em"}} onClick={() => props.submitMove("right")}>→</button>
            <br />
            <button type="button" className="btn btn-primary mb-4" style={{width: "2.5em"}} onClick={() => props.submitMove("down")}>↓</button>
        
        </>
    );
}

export default SnakeControls;
