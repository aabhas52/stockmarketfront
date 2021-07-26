
function FetchSectors() {
    const response = fetch('http://localhost:8080/allSectors', {
        mode: 'cors',
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    return response;
}

export default FetchSectors;