import React, {Component} from "react";

class NewUser extends Component{

    constructor(){
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            phone: null
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
        // console.log(UserJson);
        fetch("http://localhost:8080/setuserapi", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserJson)
        }).then(response => {
            if(response.ok){
                alert('New user added');
            }
            else{
                alert('New user cannot be added');
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
                <input type="tel" pattern="[0-9]{10}" onChange={this.onChange} className="form-control" placeholder="Phone" id="phone" required/>
            </div>
            <div className="input-group-mb-3">
                <input type="submit"/>
            </div>
        </form>
    }

}

export default NewUser;