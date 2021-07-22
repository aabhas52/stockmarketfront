import React, {Component} from 'react';

class AddStockExchange extends Component{

    constructor() {
        super();
        this.state = {
            name: null,
            code: null,
            brief: null,
            address: null,
            remarks: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        // console.log(this.state);
        const ExchangeJson = {
            "stockExchangeName": this.state.name,
            "stockExchangeCode": this.state.code,
            "brief": this.state.brief,
            "contactAddress": this.state.address,
            "remarks": this.state.remarks
        };
        fetch("http://localhost:8080/addStockExchange", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ExchangeJson)
        }).then(response => {
            if(response.ok){
                alert('Exchange Added');
            }
            else{
                alert('Exchange Not Added')
            }
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Stock Exchange Name" id="name" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Stock Exchange Code" id="code" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Address" id="address" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Brief" id="brief"/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Remarks" id="remarks"/>
            </div>
            <div className="input-group-mb-3">
                <input type="submit"/>
            </div>
        </form>
    }

}

export default AddStockExchange;