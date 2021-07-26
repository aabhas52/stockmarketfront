import React, { Component } from 'react';
import FetchCompany from '../fetches/fetchCompany';
import Select from 'react-select';

class ShowIPO extends Component {

    constructor() {
        super();
        this.state = {
            allIpos: null,
            ipo: null,
            company: null,
            companyList: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
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
                    this.setState({ ipo: json, allIpos: null });
                    // console.log(json);
                });
            }
        });

        const call = FetchCompany();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = [];
                    json.map((company, _key) => (
                        list.push({ "label": company['companyName'], "value": company['companyName'] })
                    ));
                    this.setState({ companyList: list });
                });
            }
        });
    }

    handleCompany(event) {
        this.setState({ company: event.value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:8080/companyIpo/" + this.state.company, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    render() {
        if (this.state.ipo != null) {
            return <div className="row">
                <div className="d-flex justify-content-center mb-3">
                    <h3>List of IPOs</h3>
                </div>
                <form onSubmit={this.handleSubmit} className="col-sm-4">
                    <Select
                        options={this.state.companyList}
                        placeholder="Find by company"
                        className="col-sm-6 mb-3"
                        onChange={this.handleCompany}
                    ></Select>
                    <div className="input-group-mb-3">
                        <input type="submit" value="Submit query" className="btn btn-primary"/>
                    </div>
                </form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Stock Exchange</th>
                            <th scope="col">Price per Share (in INR)</th>
                            <th scope="col">Number of Shares</th>
                            <th scope="col">Opening Date</th>
                            <th scope="col">Opening time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ipo.map((ipo, i) => (
                            <tr key={i}>
                                <td className="col">{ipo.company.companyName}</td>
                                <td className="col">{ipo.stockExchange.stockExchangeCode}</td>
                                <td className="col">{ipo.pricePerShare}</td>
                                <td className="col">{ipo.numberOfShares}</td>
                                <td className="col">{ipo.openingDate}</td>
                                <td className="col">{ipo.openingTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        }
        else {
            return <div>
                Fetching IPOs...
            </div>
        }
    }

}

export default ShowIPO;