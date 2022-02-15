function BadGameID() {
    return (
        <div className="alert alert-danger" role="alert">
            <h2 className="text-center">Invalid Game ID</h2>
            <hr />
            <p className="text-center mb-0">No game with the provided ID could be found.</p>
        </div>
    );
}

export default BadGameID;
