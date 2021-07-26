import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import FetchCompany from '../fetches/fetchCompany';
import FetchSectors from '../fetches/fetchSectors';
import { Modal } from 'react-bootstrap';

class ManageCompanies extends Component {

    constructor() {
        super();
        this.state = {
            companies: null,
            editingCompany: false,
            currentCompany: null,
            sectorList: null,
            modalInfo: null,
            showModal: false
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.completeEdit = this.completeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSector = this.handleSector.bind(this);
        this.showMore = this.showMore.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const call = FetchCompany();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ companies: json });
                });
            }
        });
        const sectorCall = FetchSectors();
        sectorCall.then(response => {
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

    handleSector(event) {
        this.setState({ sector: event.value });
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
        });
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
        });
    }

    showMore(company) {
        fetch("http://localhost:8080/exchangesToCompany/" + company.companyName, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({
                        modalInfo: {
                            company: company,
                            exchanges: json
                        }
                    });
                })
            }
        });
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    render() {
        let modalElement = <div></div>;
        if (this.state.modalInfo != null) {
            modalElement = (
                <Modal className="modal-fade" show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{this.state.modalInfo.company.companyName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li>CEO: {this.state.modalInfo.company.ceo}</li>
                            <li>Board of directors: {this.state.modalInfo.company.directors}</li>
                            <li>Turnover (in INR): {this.state.modalInfo.company.turnover}</li>
                            <li>Sector: {this.state.modalInfo.company.sector.sectorName}</li>
                            <li>Brief: {this.state.modalInfo.company.writeup}</li>
                            <li>Active in stock exchanges:
                                <ul>
                                    {this.state.modalInfo.exchanges.map((exchange, i) => (
                                        <li key={i}>
                                            {exchange.stockExchangeName}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            );
        }
        if (this.state.companies != null && !this.state.editingCompany) {
            return <div>
                <div className="d-flex justify-content-center mb-3">
                    <h3>List of Companies</h3>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">CEO</th>
                            <th scope="col">Brief</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.map((company, i) => (
                            <tr key={i}>
                                <td>{company['companyName']}</td>
                                <td>{company['ceo']}</td>
                                <td>{company['writeup']}</td>
                                <td>
                                    <button className="col btn btn-primary" onClick={() => { this.showMore(company) }} >View more</button>
                                </td>
                                <td>
                                    <button className="col btn btn-primary" onClick={() => { this.handleEdit(company) }}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/admin/companies/new"><button className="btn btn-primary">Add new company</button></Link>
                {modalElement}
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
                <Select
                    options={this.state.sectorList}
                    placeholder="Choose sector"
                    className="col-sm-6 mb-3"
                    onChange={this.handleSector}
                ></Select>
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control" value={this.state.currentCompany['writeup']} placeholder="Brief Writeup about Company" id="writeup" />
                </div>
                <div className="input-group-mb-3">
                    <input type="submit" value="Submit details" className="btn btn-primary" />
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