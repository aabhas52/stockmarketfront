import React, {Component} from 'react';

class AddIPO extends Component{
    
    constructor() {
        super();
        this.state = {
            name: null,
            code: null,
            price: null,
            remarks: null,
            date: null,
            time: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const IPOJson = {
            "company_name": this.state.name,
            "price": parseFloat(this.state.price),
            "stock_exchange_code": this.state.code,
            "remarks": this.state.remarks,
            "shares": parseInt(this.state.shares),
            "date": this.state.date,
            "time": this.state.time
        };
        // console.log(IPOJson);
        fetch("http://localhost:8080/addIpo", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(IPOJson)
        }).then(response => {
            if(response.ok){
                alert('IPO Added');
            }
            else{
                alert('IPO Not Added')
            }
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Company Name" id="name" required/>
            </div>
            <div className="input-group mb-3">
                <input type="text" onChange={this.handleChange} className="form-control" placeholder="Stock Exchange Code" id="code" required/>
            </div>
            <div className="input-group mb-3">
                <input type="number" onChange={this.handleChange} className="form-control" placeholder="Price per share (in Rs.)" id="price" step="0.01" min="0" required/>
            </div>
            <div className="input-group mb-3">
                <input type="number" onChange={this.handleChange} className="form-control" placeholder="Number of shares" id="shares" required/>
            </div>
            <div className="input-group mb-3">
                <input type="date" onChange={this.handleChange} className="form-control" placeholder="Date" id="date"/>
            </div>
            <div className="input-group mb-3">
                <input type="time" onChange={this.handleChange} className="form-control" placeholder="Time" id="time"/>
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

export default AddIPO;