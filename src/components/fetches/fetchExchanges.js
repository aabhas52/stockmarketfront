
function FetchExchanges() {
    const response = fetch('http://localhost:8080/allStockExchanges', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
    },
    );
    return response;
}

export default FetchExchanges;