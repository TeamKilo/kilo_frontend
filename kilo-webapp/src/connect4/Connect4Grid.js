function Connect4Grid(props) {
    const gridState = props.gridState;

    const tableItems = gridState.map((row) => {
        const rowItems = row.map(cell => {
            const colorClass = ["", "player1", "player2"];
            return (<td className={"connect4cell " + colorClass[cell]}></td>);
        });
        return (<tr>{rowItems}</tr>);
    });

    return (
        <table className="table table-bordered" id="connect4table">
            <tbody>
                {tableItems}
            </tbody>
        </table>
    );
}

export default Connect4Grid;
