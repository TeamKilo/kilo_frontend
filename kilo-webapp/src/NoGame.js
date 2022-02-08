function NoGame(props) {
    return (
        <div className="alert alert-primary" role="alert">
            <h4 className="alert-heading">Welcome to Kilo</h4>
            <hr/>
            <p>To view the state of an existing game, type its game ID and click view.</p>
            <p className="mb-0">To create a new game, click Create Game. You will then be told the new game's ID.</p>
        </div>
    );
}

export default NoGame;
