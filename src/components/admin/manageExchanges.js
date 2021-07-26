import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FetchExchanges from '../fetches/fetchExchanges';

class ManageExchanges extends Component {

    constructor() {
        super();
        this.state = {
            exchanges: null
        }
    }

    componentDidMount() {
        const call = FetchExchanges();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ exchanges: json });
                });
            }
        });
    }

    render() {
        if (this.state.exchanges != null) {
            return <div>
                <div className="d-flex justify-content-center mb-3">
                    <h3>List of Exchanges</h3>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Exchange Name</th>
                            <th scope="col">Exchange Code</th>
                            <th scope="col">Address</th>
                            <th scope="col">Brief</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.exchanges.map((exchange, i) => (
                            <tr key={i}>
                                <td>{exchange['stockExchangeName']}</td>
                                <td>{exchange['stockExchangeCode']}</td>
                                <td>{exchange['contactAddress']}</td>
                                <td>{exchange['brief']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link className="mb-3" to="/admin/exchanges/new"><button className="btn btn-primary">Add new exchange</button></Link>
            </div>
        }
        else {
            return <div>
                Fetching exchanges...
            </div>
        }
    }

}

export default ManageExchanges;