function httpRequest(url, method, body) {
    if (!["GET", "POST"].includes(method)) {
        alert(`${method} is not a valid method`);
        return {};
    }
    fetch(url, {
        mode: "no-cors",
        method: method,
        body: JSON.stringify(body)
    }).then(res => { console.log(res); return res.json() })
        .then(res => alert(res))
        .catch(res => console.log('Request failed', res));
}

export default httpRequest;