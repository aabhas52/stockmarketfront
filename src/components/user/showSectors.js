import React, { Component } from 'react';
import FetchSectors from '../fetches/fetchSectors';

class ShowSectors extends Component {

    constructor() {
        super();
        this.state = {
            sectors: null
        }
    }

    componentDidMount() {
        const call = FetchSectors();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ sectors: json });
                });
            }
        });
    }

    render() {
        if (this.state.sectors != null) {
            return <div>
                <div className="d-flex justify-content-center mb-3">
                    <h3>List of Sectors</h3>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sector</th>
                            <th scope="col">Brief</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sectors.map((sector, i) => (
                            <tr key={i}>
                                <td>{sector['sectorName']}</td>
                                <td>{sector['brief']}</td>
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