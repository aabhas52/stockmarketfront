import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ManageExchanges extends Component {

    constructor() {
        super();
        this.state = {
            exchanges: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/allStockExchanges', {
            mode: 'cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
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
                    List of Exchanges
                </div>
                <ul className="list-group">
                    {this.state.exchanges.map((exchange, i) => (
                        <li className="list-group-item mb-3" key={i}>
                            <div className="row">
                                <div className="col">{exchange['stockExchangeName']}</div>
                                <div className="col">{exchange['stockExchangeCode']}</div>
                                <div className="col">{exchange['contactAddress']}</div>
                                <div className="col">{exchange['brief']}</div>
                            </div>
                        </li>
                    ))}
                </ul>
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