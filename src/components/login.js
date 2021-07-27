import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AdminNavbar from "./admin/adminNavbar";
import UserNavbar from "./user/userNavbar";
import { Redirect } from "react-router";
import NewUser from "./newUser";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            login: false,
            error: null,
            role: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginPage = this.loginPage.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const UserJson = {
            "username": this.state.username,
            "password": this.state.password
        };
        fetch("http://localhost:8080/authenticate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            'Access-Control-Allow-Origin': '*',
            'Vary': 'Origin'.replace,
            'Accept': 'application/json',
            body: JSON.stringify(UserJson)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({
                        role: json.role,
                        login: true
                    });
                    window.sessionStorage.setItem("role", json.role);
                    window.sessionStorage.setItem("token", json.token);
                    window.sessionStorage.setItem("username", json.username);
                    window.sessionStorage.setItem("password", json.password);
                    window.sessionStorage.setItem("id", json.id);
                });
            }
            else if(response.status === 401){
                this.setState({error: 'User does not exist'})
            }
            else {
                response.text().then(message => {
                    this.setState({
                        error: message
                    });
                })
            }
        });
    }

    loginPage() {
        return <div>
            <div className="text-danger">{this.state.error}</div>
            <form onSubmit={this.handleSubmit} className="col-sm-4">
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} className="form-control" placeholder="User name" id="username" required />
                </div>
                <div className="input-group mb-3">
                    <input type="password" onChange={this.handleChange} className="form-control" placeholder="Password" id="password" required />
                </div>
                <div className="input-group-mb-3">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
            <br /><br />
            <Link to="/newUser">Create new user</Link>
        </div>
    }

    render() {
        if (this.state.login === false) {
            return <div>
                <Switch>
                    <Route exact path="/newUser" component={NewUser}></Route>
                    <Route render={this.loginPage} />
                </Switch>
            </div>
        }
        else {
            if (this.state.role === "admin") {
                return <div>
                    <Redirect push to="/admin" />
                    <Route path="/admin" component={AdminNavbar} />
                </div>
            }
            else {
                return <div>
                    <Redirect push to="/user" />
                    <Route path="/user" component={UserNavbar} />
                </div>
            }
        }
    }
}

export default Login;