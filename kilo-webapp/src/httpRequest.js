import axios from "axios";

function httpRequest(url, method, body) {
    if (!["GET", "POST"].includes(method)) {
        alert(`${method} is not a valid method`);
        return {};
    }
    axios({
        url: url,
        mode: "no-cors",
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    }).then(res => { console.log(res); return res.data.json() })
        .then(res => alert(res))
        .catch(res => console.log('Request failed', res));
}

export default httpRequest;
