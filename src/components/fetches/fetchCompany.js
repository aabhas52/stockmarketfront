
function FetchCompany() {

    const response = fetch('http://localhost:8080/allCompanies', {
        mode: 'cors',
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    return response;
}

export default FetchCompany;