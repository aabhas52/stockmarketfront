import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ShowCompanies extends Component {

    constructor() {
        super();
        this.state = {
            companyList: null,
            company: null,
            companyDetails: null,
            exchanges: null,
            modalInfo: null,
            showModal: false
        }
        this.showMore = this.showMore.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleCompany(event) {
        const company = event.target.value;
        if (company.length > 1) {
            fetch("https://stock-market-back.herokuapp.com/findMatchingCompany/" + company, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.setState({ companyList: json });
                    });
                }
            });
        }
    }

    showMore(company) {
        fetch("https://stock-market-back.herokuapp.com/exchangesToCompany/" + company.companyName, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
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
        let companyInfo = <div></div>;
        if (this.state.companyList != null) {
            companyInfo = (
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">CEO</th>
                            <th scope="col">Brief</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companyList.map((company, i) => (
                            <tr key={i}>
                                <td>{company['companyName']}</td>
                                <td>{company['ceo']}</td>
                                <td>{company['writeup']}</td>
                                <td>
                                    <button className="col btn btn-primary" onClick={() => { this.showMore(company) }} >View more</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>);
        }
        let modalElement = <div></div>;
        if (this.state.modalInfo != null) {
            modalElement = (
                <Modal className="modal-fade" show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{this.state.modalInfo.company.companyName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-group">
                            <li className="list-group-item">CEO: {this.state.modalInfo.company.ceo}</li>
                            <li className="list-group-item">Board of directors: {this.state.modalInfo.company.directors}</li>
                            <li className="list-group-item">Turnover (in INR): {this.state.modalInfo.company.turnover}</li>
                            <li className="list-group-item">Sector: {this.state.modalInfo.company.sector.sectorName}</li>
                            <li className="list-group-item">Brief: {this.state.modalInfo.company.writeup}</li>
                            <li className="list-group-item">Active in stock exchanges:
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
        };
        return <div>
            <form className="col-sm-4">
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleCompany} className="form-control" placeholder="Enter company name" id="companyName" required />
                </div>
                <br /><br />
            </form>
            {companyInfo}
            {modalElement}
        </div>
    }

}

export default ShowCompanies;