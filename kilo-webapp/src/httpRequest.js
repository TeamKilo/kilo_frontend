function httpRequest(url, method, body) {
    if (!["GET", "POST"].includes(method)) {
        alert(`${method} is not a valid method`);
        return {};
    }
    fetch(url, {
        method: method,
        body: JSON.stringify(body)
    }).then(res => { return res.json() })
        .then(res => alert(res))
        .catch(res => console.log('Request failed', res));
}