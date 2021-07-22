import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "./login";
import AdminNavbar from "./adminNavbar";
import UserNavbar from "./userNavbar";

class App extends Component {

    render() {
        const role = window.sessionStorage.getItem("role");
        if (role === "admin") {
            return <div>
                <Redirect to="/admin" />
                <Route path="/admin" component={AdminNavbar}/>
                </div>
        }
        else if (role === "user") {
            return <div>
            <Redirect to="/user" />
            <Route path="/user" component={UserNavbar}/>
            </div>
        }
        else {
            return <div>
                <Login />
            </div>
        }
    }

}

export default App;