
function FetchSectors() {
    const response = fetch('https://stock-market-back.herokuapp.com/allSectors', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
    });
    return response;
}

export default FetchSectors;