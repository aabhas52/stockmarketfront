
function FetchExchanges() {
    const response = fetch('http://localhost:8080/allStockExchanges', {
        mode: 'cors',
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    );
    return response;
}

export default FetchExchanges;