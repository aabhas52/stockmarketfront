import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ExcelUpload from "./excelupload";
import ManageCompanies from "./manageCompanies";
import ManageExchanges from "./manageExchanges";
import AddIPO from "./addIPO";
import AddStockExchange from "./addStockExchange";
import AddCompany from "./addCompany";
import AddMapping from "./addMapping";
import { Navbar, NavItem } from "react-bootstrap";
import ShowSectors from "../user/showSectors";

class AdminNavbar extends Component {

    constructor() {
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
            <Navbar bg="dark" expand="lg" className="nav-tabs">
                <NavItem className="mx-3">
                    <Link to="/admin/importData">Import Data</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/admin/companies">Manage Companies</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/admin/exchanges">Manage Exchanges</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/admin/updateIPO">Update IPO Details</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/admin/mappings">Add Company Codes</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/admin/sectors">View Sectors</Link>
                </NavItem>
                <NavItem className="ms-auto">
                    <button className="btn btn-primary" onClick={this.logout}>
                        Logout
                    </button>
                </NavItem>
            </Navbar>
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
                <Route exact path="/admin/sectors">
                    <ShowSectors />
                </Route>
            </Switch>
        </div>
    }

}


export default AdminNavbar;