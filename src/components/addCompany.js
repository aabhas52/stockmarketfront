import React, { Component } from 'react';

class AddCompany extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            turnover: null,
            ceo: null,
            directors: null,
            sector: null,
            writeup: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const CompanyJson = {
            "company_name": this.state.name,
            "turnover": parseFloat(this.state.turnover),
            "ceo": this.state.ceo,
            "directors": this.state.directors,
            "sector": this.state.sector,
            "writeup": this.state.writeup
        };
        fetch("http://localhost:8080/addCompany", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(CompanyJson)
        }).then(response => {
            if(response.ok){
                alert('Company Added');
            }
            else{
                alert('Company Not Added')
            }
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit} className="col-sm-6">
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Company Name" id="name" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="CEO" id="ceo" required/>
            </div>
            <div className="input-group mb-3">
                <input type="number" onChange={this.handleChange} className="form-control" placeholder="Turnover" id="turnover" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Board of Directors" id="directors" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Sector" id="sector" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Brief Writeup about Company" id="writeup"/>
            </div>
            <div className="input-group-mb-3">
                <input type="submit"/>
            </div>
        </form>
    }

}

export default AddCompany;