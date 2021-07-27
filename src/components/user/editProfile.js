import React, {Component} from "react";

class EditProfile extends Component{

    constructor(){
        super();
        this.state = {
            username: null,
            password: null,
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
            "id": window.sessionStorage.getItem("id")
        };
        fetch("https://stock-market-back.herokuapp.com/editUser", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(UserJson)
        }).then(response => {
            if(response.ok){
                this.setState({message: "User details updated!"})
            }
            else{
                this.setState({message: "User details could not be updated."})
            }
        });
    }

    render(){
        return <form className="col-sm-4" onSubmit={this.onSubmit}>
            <div className="input-group mb-3">
                <input type="text" onChange={this.onChange} className="form-control" placeholder=" New Username" id="username" required/>
            </div>
            <div className="input-group mb-3">
                <input type="password" onChange={this.onChange} className="form-control" placeholder="New Password" id="password" required/>
            </div>
            <div className="input-group-mb-3">
                <input type="submit" value="Update user" className="btn btn-primary"/>
            </div>
            <br/><br/>
            {this.state.message}
        </form>
    }

}

export default EditProfile;