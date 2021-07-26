import React, { Component } from 'react';
import Select from 'react-select';
import FetchCompany from '../fetches/fetchCompany';
import ShowIPO from '../user/showIPO';
import FetchExchanges from '../fetches/fetchExchanges';

class AddIPO extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            code: null,
            price: null,
            remarks: null,
            date: null,
            time: null,
            companyList: null,
            exchangeList: null,
            getIPO: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
        this.handleExchange = this.handleExchange.bind(this);
    }

    componentDidMount() {
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
        const excall = FetchExchanges();
        excall.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = [];
                    json.map((exchange, _key) => (
                        list.push({ "label": exchange['stockExchangeCode'], "value": exchange['stockExchangeCode'] })
                    ));
                    this.setState({ exchangeList: list });
                });
            }
        });
    }

    handleCompany(event) {
        this.setState({ name: event.value });
    }

    handleExchange(event) {
        this.setState({ code: event.value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const IPOJson = {
            "company_name": this.state.name,
            "price": parseFloat(this.state.price),
            "stock_exchange_code": this.state.code,
            "remarks": this.state.remarks,
            "shares": parseInt(this.state.shares),
            "date": this.state.date,
            "time": this.state.time
        };
        fetch("http://localhost:8080/editIpo", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(IPOJson)
        }).then(response => {
            this.setState({
                getIPO: !this.state.getIPO
            })
        })
    }

    render() {
        return <div>
            <form className="col-sm-4" onSubmit={this.handleSubmit}>
                <Select
                    options={this.state.companyList}
                    placeholder="Choose company"
                    className="col-sm-6 mb-3"
                    onChange={this.handleCompany}
                ></Select>
                <Select
                    options={this.state.exchangeList}
                    placeholder="Choose stock exchange"
                    className="col-sm-6 mb-3"
                    onChange={this.handleExchange}
                ></Select>
                <div className="mb-3">
                    <input type="number" onChange={this.handleChange} className="form-control" placeholder="Price per share (in Rs.)" id="price" step="0.01" min="0" required />
                </div>
                <div className="mb-3">
                    <input type="number" onChange={this.handleChange} className="form-control " placeholder="Number of shares" id="shares" required />
                </div>
                <div className="mb-3">
                    <input type="date" onChange={this.handleChange} className="form-control" placeholder="Date" id="date" />
                </div>
                <div className="mb-3">
                    <input type="time" onChange={this.handleChange} className="form-control" placeholder="Time" id="time" />
                </div>
                <div className="mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control " placeholder="Remarks" id="remarks" />
                </div>
                <div className="input-group-mb-3">
                    <input type="submit" value="Submit details" className="btn btn-primary"/>
                </div>
            </form>
            <br /><br />
            <ShowIPO />
        </div>
    }
}

export default AddIPO;