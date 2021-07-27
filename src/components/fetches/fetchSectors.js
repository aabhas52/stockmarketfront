
function FetchSectors() {
    const response = fetch('http://localhost:8080/allSectors', {
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