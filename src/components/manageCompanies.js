import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ManageCompanies extends Component {

    constructor() {
        super();
        this.state = {
            companies: null,
            editingCompany: false,
            currentCompany: null
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.completeEdit = this.completeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/allCompanies', {
            mode: 'cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ companies: json });
                    // console.log(this.state.companies);
                });
            }
        });
    }

    handleEdit(company) {
        this.setState({
            editingCompany: true,
            currentCompany: company
        });
    }

    completeEdit() {
        fetch("http://localhost:8080/editCompany", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.currentCompany)
        }).then(response => console.log(response));
        this.setState({
            editingCompany: false
        });
    }

    handleChange(event) {
        const field = event.target.id;
        const changes = this.state.currentCompany;
        changes[field] = event.target.value;
        this.setState({
            currentCompany: changes
        })
        // console.log(this.state.currentCompany);
    }

    render() {
        if (this.state.companies != null && !this.state.editingCompany) {
            return <div>
                <div className="d-flex justify-content-center mb-3">
                    List Of Companies
                </div>
                <ul className="list-group">
                    {this.state.companies.map((company, i) => (
                        <li className="list-group-item mb-3" key={i}>
                            <div className="row" comp={company}>
                                <div className="col">{company['companyName']}</div>
                                <div className="col">{company['ceo']}</div>
                                <div className="col">{company['turnover']}</div>
                                <div className="col">{company['writeup']}</div>
                                <button className="col btn btn-primary" onClick={() => { this.handleEdit(company) }}>Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link to="/admin/companies/new"><button className="btn btn-primary">Add new company</button></Link>
            </div>
        }
        else if (this.state.editingCompany) {
            return <form onSubmit={this.completeEdit} className="col-sm-6">
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control" value={this.state.currentCompany['companyName']} placeholder="Company Name" id="companyName" required />
                </div>
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control" value={this.state.currentCompany['ceo']} placeholder="CEO" id="ceo" required />
                </div>
                <div className="input-group mb-3">
                    <input type="number" onChange={this.handleChange} className="form-control" value={this.state.currentCompany['turnover']} placeholder="Turnover" id="turnover" required />
                </div>
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control" value={this.state.currentCompany['directors']} placeholder="Board of Directors" id="directors" required />
                </div>
                <div className="input-group mb-3">
                    <input type="number" onChange={this.handleChange} className="form-control" value={this.state.currentCompany.sector.id} placeholder="Sector ID" id="sectorid" required />
                </div>
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control" value={this.state.currentCompany['writeup']} placeholder="Brief Writeup about Company" id="writeup" />
                </div>
                <div className="input-group-mb-3">
                    <input type="submit" />
                </div>
            </form>
        }
        else {
            return <div>
                Fetching companies...
            </div>
        }
    }

}

export default ManageCompanies;