import React, { Component } from 'react';
import FetchSectors from '../fetches/fetchSectors';

class ShowSectors extends Component {

    constructor() {
        super();
        this.state = {
            sectors: null,
            companies: {}
        }
    }

    renderCompanies(sector) {
        if (this.state.companies[`${sector.sectorName}`] !== undefined) {
            return <ul>
                {
                    this.state.companies[`${sector.sectorName}`].map((company, key) => (
                        <li key={key}>{company.companyName}</li>
                    ))
                }
            </ul>
        }
        else{
            return <div></div>
        }
    }

    componentDidMount() {
        const call = FetchSectors();
        call.then(response => {
            if (response.ok) {
                response.json().then(sectorList => {
                    sectorList.map((sector, _key) => (
                        fetch("http://localhost:8080/allCompanies/" + sector.sectorName, {
                            mode: 'cors',
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                            },
                        }).then(response => (
                            response.json().then(json => (
                                this.setState({
                                    companies: {
                                        ...this.state.companies,
                                        [`${sector.sectorName}`]: json
                                    }
                                })
                            ))
                        ))
                    ))
                    this.setState({ sectors: sectorList });
                });
            }
        });
    }

    render() {
        if (this.state.sectors != null && Object.entries(this.state.companies).length !== 0) {
            return <div>
                <div className="d-flex justify-content-center mb-3">
                    <h3>List of Sectors</h3>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sector</th>
                            <th scope="col">Brief</th>
                            <th scope="col">Companies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sectors.map((sector, i) => (
                            <tr key={i}>
                                <td>{sector['sectorName']}</td>
                                <td>{sector['brief']}</td>
                                <td>
                                    {this.renderCompanies(sector)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
        else {
            return <div>
                Fetching sectors...
            </div>
        }
    }

}

export default ShowSectors;