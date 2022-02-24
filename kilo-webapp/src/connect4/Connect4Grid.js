function Connect4Grid(props) {
    const size = 50;
    const radius = size / 2 - 7;
    const offset = 5;
    const width = props.gridState[0].length;
    const height = props.gridState.length;
    const colorClass = ["", "player1", "player2"];
    const playingPiece = (
        <svg width={radius * 2} height={radius * 2}>
            <circle cx={radius} cy={radius} r={radius} stroke="black" />
        </svg>
    );

    let playing = props.onColumnClicked !== undefined;
    let submitMove = playing ? props.onColumnClicked : () => {};

    return (
        <div style={{ position: "relative" }}>
            <svg id="connect4table" width={size * width + offset * 2} height={size * (height + 1.5)}>
                <path fillRule="evenodd" fill="blue" stroke="black" strokeWidth="3" strokeLinejoin="round"
                    d={`M 5, ${size} h${size * width} v${size * height} h${-size * width} v${-size * height} h10` + props.gridState.map((row, y) => {
                        return (
                            row.map((_, x) => {
                                return (
                                    `
                                        M ${size * x + size / 2 + offset} ${size * (y + 1) + size / 2}
                                        m -${radius}, 0
                                        a ${radius},${radius} 0 1,1 ${radius * 2},0
                                        a ${radius},${radius} 0 1,1 ${-radius * 2},0
                                    `
                                );
                            }).join(" ")
                        );
                    }).join(" ")}
                />
                {[...Array(7).keys()].map(x => 
                    <text key={x} fontSize="18" x={size * x + radius + width} y={size * (height + 1.5) - 3}>{x + 1}</text>
                )}
            </svg>
            <div style={{ position: "absolute", left: `calc(50% - ${size * width / 2 - offset - 2}px)`, top: `calc(50% - ${size * (height + 1.5) / 2 - size - offset - 1}px )`}}>
                {props.gridState.map((row, y) => {
                    return (
                        row.map((cell, x) => {
                            
                            return (
                                <div
                                    key={x + y * 7}
                                    className={"connect4cell " + colorClass[cell]}
                                    style={{ left: (x * size), top: (y * size), "--top": (y * size) + "px", "--y-index": y}}
                                    data-full={cell ? "full" : ""}
                                >
                                    {cell ? playingPiece : ""}
                                </div>
                            );
                        })
                    )
                })}

                {(playing ? props.gridState[0] : []).map((_, x) => {
                    return (
                        <div key={x} className="move-input" style={{ left: (x * size - offset), width: (size), height: (height * size) }} onClick={() => submitMove(x)} />
                    );
                })}
            </div>
        </div>
    );
}

export default Connect4Grid;
