import React from "react";

export function humanFriendly(str) {
    str = str.replaceAll("_", " ");
    let words = str.split(" ");
    words = words.map((word) => word.length > 0 ? word.charAt(0).toUpperCase() + word.substr(1) : word);
    return words.join(" ");
}

export function playerElements(players) {
    return players.map((name) => <React.Fragment key={name}><span className="badge bg-secondary">{name}</span><span> </span></React.Fragment>);
}
