import React, { Component } from 'react';

class ShowIPO extends Component {

    constructor() {
        super();
        this.state = {
            ipo: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/allIPOs', {
            mode: 'cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ ipo: json });
                    // console.log(json);
                });
            }
        });
    }

    render() {
        if (this.state.ipo != null) {
            return <div>
                <div className="d-flex justify-content-center mb-3">
                    List Of IPOs
                </div>
                <ul className="list-group">
                    {this.state.ipo.map((ipo, i) => (
                    <li className="list-group-item" key={i}>
                        <div className="row">
                            <div className="col">{ipo.company.companyName}</div>
                            <div className="col">{ipo.stockExchange.stockExchangeCode}</div>
                            <div className="col">{ipo.pricePerShare}</div>
                            <div className="col">{ipo.numberOfShares}</div>
                            <div className="col">{ipo.openingDate}</div>
                            <div className="col">{ipo.openingTime}</div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        }
        else{
            return <div>
                Fetching IPOs...
            </div>
        }
    }

}

export default ShowIPO;