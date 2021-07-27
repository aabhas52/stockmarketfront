import React, { Component } from "react";
import { Navbar, NavItem } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import TwoCompanies from "../../charts/twoCompanies";
import TwoSectors from "../../charts/twoSectors";
import ShowIPO from "./showIPO";
import ShowSectors from "./showSectors";
import CompanyPeriod from "../../charts/companyPeriod"
import SectorPeriod from "../../charts/sectorPeriod";
import CompanyVsSector from "../../charts/companyVsSector";
import ShowCompanies from "./showCompanies";
import EditProfile from "./editProfile";


class UserNavbar extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("role");
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("password");
        window.sessionStorage.removeItem("id");
        window.location.reload();
        window.location.assign("/");
    }

    render() {
        return <div>
            <Navbar bg="dark">
                <NavItem className="mx-3">
                    <Link to="/user/ipos">IPOs</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/allCompanies">Find companies</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/companyPrices">Company Prices</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/companyCompare">Compare Companies</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/sectors">View Sectors</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/sectorPrices">Sector prices</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/sectorCompare">Compare Sectors</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/companyVsSector">Compare Company and Sector</Link>
                </NavItem>
                <NavItem className="mx-3">
                    <Link to="/user/editUser">Edit Profile</Link>
                </NavItem>
                <NavItem className="ms-auto">
                    <button className="btn btn-primary" onClick={this.logout}>
                        Logout
                    </button>
                </NavItem>
            </Navbar>
            <Switch>
                <Route exact path="/user/ipos">
                    <ShowIPO />
                </Route>
                <Route exact path="/user/companyCompare">
                    <TwoCompanies />
                </Route>
                <Route exact path="/user/sectors">
                    <ShowSectors />
                </Route>
                <Route exact path="/user/sectorCompare">
                    <TwoSectors />
                </Route>
                <Route exact path="/user/companyPrices">
                    <CompanyPeriod />
                </Route>
                <Route exact path="/user/sectorPrices">
                    <SectorPeriod />
                </Route>
                <Route exact path="/user/companyVsSector">
                    <CompanyVsSector />
                </Route>
                <Route exact path="/user/allCompanies">
                    <ShowCompanies />
                </Route>
                <Route exact path="/user/editUser">
                    <EditProfile />
                </Route>
            </Switch>
        </div>
    }

}


export default UserNavbar;