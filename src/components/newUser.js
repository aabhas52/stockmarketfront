import React, {Component} from "react";

class NewUser extends Component{

    constructor(){
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            phone: null,
            message: null
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onSubmit(event){
        event.preventDefault();
        const UserJson = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "phone": this.state.phone
        };
        fetch("https://stock-market-back.herokuapp.com/register", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserJson)
        }).then(response => {
            if(response.ok){
                this.setState({message: "New user created!"})
            }
            else{
                this.setState({message: "New user could not be created."})
            }
        });
    }

    render(){
        return <form className="col-sm-6" onSubmit={this.onSubmit}>
            <div className="input-group mb-3">
                <input type="text" onChange={this.onChange} className="form-control" placeholder="User Name" id="username" required/>
            </div>
            <div className="input-group mb-3">
                <input type="password" onChange={this.onChange} className="form-control" placeholder="Password" id="password" required/>
            </div>
            <div className="input-group mb-3">
                <input type="email" onChange={this.onChange} className="form-control" placeholder="Email" id="email" required/>
            </div>
            <div className="input-group mb-3">
                <input type="tel" pattern="[0-9]{10}" onChange={this.onChange} className="form-control" placeholder="Phone" id="phone"/>
            </div>
            <div className="input-group-mb-3">
                <input type="submit" value="Create user" className="btn btn-primary"/>
            </div>
            <br/><br/>
            {this.state.message}
        </form>
    }

}

export default NewUser;