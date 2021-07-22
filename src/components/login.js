import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserNavbar from "./userNavbar";
import AdminNavbar from "./adminNavbar";
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
        fetch("http://localhost:8080/loginUser", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserJson)
        }).then(response => {
            if (response.ok) {
                response.text().then(userRole => {
                    // console.log(userRole);
                    this.setState({
                        role: userRole,
                        login: true
                    });
                    window.sessionStorage.setItem("role", userRole);
                });
            }
            else {
                response.text().then(message => {
                    // console.log(message);
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
                    <input type="submit" />
                </div>
            </form>
            <Link to="/newUser">Create new user</Link>
        </div>
    }

    render() {
        if (this.state.login === false) {
            return <div>
                <Switch>
                    <Route exact path="/newUser" component={NewUser}></Route>
                    <Route render={this.loginPage}/>
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