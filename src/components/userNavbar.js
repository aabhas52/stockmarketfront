import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import CompanyPeriod from "../charts/companyPeriod";
import ShowIPO from "./showIPO";


class UserNavbar extends Component {

    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }

    logout(event){
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
                    <Link to="/user/ipos">IPOs</Link>
                </div>
                <div>
                    <Link to="/user/companyCompare">Compare Companies</Link>
                </div>
                <div>
                    <Link to="/user/sectorCompare">Compare Sectors</Link>
                </div>
            </nav>
            <Switch>
                <Route exact path="/user/ipos">
                    <ShowIPO />
                </Route>
                <Route exact path="/user/companyCompare">
                    <CompanyPeriod />
                </Route>
            </Switch>
        </div>
    }

}


export default UserNavbar;