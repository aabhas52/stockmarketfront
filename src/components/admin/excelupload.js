import React, {Component} from 'react';
import xlsxParser from 'xlsx-parse-json';

class ExcelUpload extends Component{

    constructor(){
        super();
        this.state = {
            selectedFile: null,
            result: null
        };
    }
    
    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]})
    };

    onFileUpload = () => {  
        xlsxParser.onFileSelection(this.state.selectedFile).then(data => {
                Object.entries(data).forEach(
                    ([_sheet, pricesMap]) => {
                        var Prices = [];
                        pricesMap.forEach(price => {
                            var priceJson = {
                                "company_code": price['Company Code'],
                                "stock_exchange_code": price['Stock Exchange'],
                                "price": parseFloat(price['Price Per Share(in Rs)']),
                                "date": price['Date '],
                                "time": price['Time']
                            };
                            Prices.push(priceJson);
                        });
                        fetch("http://localhost:8080/addStockPriceByCode", {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                            },
                            body: JSON.stringify(Prices)
                        }).then(response => {
                            if(response.ok){
                                response.json().then(json => {
                                    this.setState({
                                        result: <div>
                                            Successful Upload! <br/><br/>
                                            Company: {json.company} <br/>
                                            Stock Exchange: {json.exchange} <br/>
                                            Records Updated: {json.message}
                                        </div>
                                    });
                                })
                            }
                            else{
                                response.json().then(message => {
                                    this.setState({
                                        result: <h4 className="text-danger">
                                            {message.error}
                                        </h4>
                                    })
                                })
                            }
                        });
                    }
                );
            });
    }

    render(){
        return <div className="col-sm-12">
            <input type="file" onChange={this.onFileChange}></input>
            <button className="btn btn-dark" onClick={this.onFileUpload}>Upload</button>
            <br/><br/>
            {this.state.result}
        </div>
    }
}

export default ExcelUpload;