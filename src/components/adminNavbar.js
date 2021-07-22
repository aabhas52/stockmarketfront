import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ExcelUpload from "./excelupload";
import ManageCompanies from "./manageCompanies";
import ManageExchanges from "./manageExchanges";
import AddIPO from "./addIPO";
import AddStockExchange from "./addStockExchange";
import AddCompany from "./addCompany";
import AddMapping from "./addMapping";

class AdminNavbar extends Component {

    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        window.sessionStorage.removeItem("role");
        window.location.reload();
        window.location.assign("/"); 
    }

    render() {
        return <div>
            <nav className="navbar justify-content-end">
                <button className="btn btn-primary" onClick={this.logout}>
                    Logout
                </button>
            </nav>
            <nav className="navbar navbark-dark">
                <div>
                    <Link to="/admin/importData">Import Data</Link>
                </div>
                <div>
                    <Link to="/admin/companies">Manage Companies</Link>
                </div>
                <div>
                    <Link to="/admin/exchanges">Manage Exchanges</Link>
                </div>
                <div>
                    <Link to="/admin/updateIPO">Update IPO Details</Link>
                </div>
                <div>
                    <Link to="/admin/mappings">Add Company Codes</Link>
                </div>
            </nav>
            <Switch>
                <Route exact path="/admin/importData">
                    <ExcelUpload />
                </Route>
                <Route exact path="/admin/companies">
                    <ManageCompanies />
                </Route>
                <Route exact path="/admin/exchanges">
                    <ManageExchanges />
                </Route>
                <Route exact path="/admin/updateIPO">
                    <AddIPO />
                </Route>
                <Route exact path="/admin/exchanges/new">
                    <AddStockExchange />
                </Route>
                <Route exact path="/admin/companies/new">
                    <AddCompany />
                </Route>
                <Route exact path="/admin/mappings">
                    <AddMapping />
                </Route>
            </Switch>
        </div>
    }

}


export default AdminNavbar;