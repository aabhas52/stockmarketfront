import React, { Component } from 'react';

import Select from 'react-select';
import FetchSectors from '../fetches/fetchSectors'

class AddCompany extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            turnover: null,
            ceo: null,
            directors: null,
            sector: null,
            writeup: null,
            sectorList: null,
            message: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSector = this.handleSector.bind(this);
    }

    componentDidMount() {
        const call = FetchSectors()
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = [];
                    json.map((sector, _key) => (
                        list.push({ "label": sector['sectorName'], "value": sector['sectorName'] })
                    ));
                    this.setState({ sectorList: list });
                })
            }
        });
    }

    handleSector(event){
        this.setState({ sector: event.value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
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
            if (response.ok) {
                this.setState({message: "Company Added!"});
            }
            else {
                this.setState({message: 'Company Not Added'});
            }
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit} className="col-sm-6">
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Company Name" id="name" required />
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="CEO" id="ceo" required />
            </div>
            <div className="input-group mb-3">
                <input type="number" onChange={this.handleChange} className="form-control" placeholder="Turnover" id="turnover" required />
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Board of Directors" id="directors" required />
            </div>
            <Select
                options={this.state.sectorList}
                placeholder="Choose sector"
                className="col-sm-6 mb-3"
                onChange={this.handleSector}
            ></Select>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Brief Writeup about Company" id="writeup" />
            </div>
            <div className="input-group-mb-3">
                <input type="submit" value="Submit details" className="btn btn-primary"/>
            </div>
            <br/><br/>
            {this.state.message}
        </form>
    }

}

export default AddCompany;