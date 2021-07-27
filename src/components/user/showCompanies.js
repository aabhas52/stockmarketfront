import React, { Component } from 'react';
import FetchCompanies from '../fetches/fetchCompany';
import Select from 'react-select';

class ShowCompanies extends Component {

    constructor() {
        super();
        this.state = {
            companyList: null,
            company: null,
            companyDetails: null,
            exchanges: null
        }
        this.handleCompany = this.handleCompany.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const call = FetchCompanies();
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

    handleSubmit(event) {
        event.preventDefault();
        fetch("https://stock-market-back.herokuapp.com/findCompany/" + this.state.company, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ companyDetails: json });
                });
            }
        });
        fetch("https://stock-market-back.herokuapp.com/exchangesToCompany/" + this.state.company, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ exchanges: json }
                    );
                })
            }
        });
    }

    render() {
        if (this.state.companyList !== null) {
            let companyInfo = <div></div>;
            if (this.state.companyDetails != null && this.state.exchanges != null) {
                companyInfo = <ul className="list-group">
                    <li className="list-group-item">CEO: {this.state.companyDetails.company.ceo}</li>
                    <li className="list-group-item">Board of directors: {this.state.companyDetails.company.directors}</li>
                    <li className="list-group-item">Turnover (in INR): {this.state.companyDetails.company.turnover}</li>
                    <li className="list-group-item">Sector: {this.state.companyDetails.company.sector.sectorName}</li>
                    <li className="list-group-item">Brief: {this.state.companyDetails.company.writeup}</li>
                    <li className="list-group-item">Active in stock exchanges:
                        <ul>
                            {this.state.exchanges.map((exchange, i) => (
                                <li key={i}>
                                    {exchange.stockExchangeName}
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="list-group-item">
                        Lastest price details:
                        <ul>
                            <li>Date: {this.state.companyDetails.price.date} </li>
                            <li>Time: {this.state.companyDetails.price.time} </li>
                            <li>Price per share (in INR): {this.state.companyDetails.price.currentPrice} </li>
                            <li>Stock Exchange: {this.state.companyDetails.price.stockExchange.stockExchangeName} </li>
                        </ul>
                    </li>
                </ul>
            }
            return <form onSubmit={this.handleSubmit} className="col-sm-4">
                <Select
                    options={this.state.companyList}
                    placeholder="Search for company"
                    className="mb-3"
                    onChange={this.handleCompany}
                ></Select>
                <div className="input-group-mb-3">
                    <input type="submit" value="Submit query" className="btn btn-primary" />
                </div>
                <br/><br/>
                {companyInfo}
            </form>
        }
        else{
            return <div>
                Fetching companies...
            </div>
        }
    }

}

export default ShowCompanies;