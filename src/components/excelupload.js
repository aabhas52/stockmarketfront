import React, {Component} from 'react';
import xlsxParser from 'xlsx-parse-json';

class ExcelUpload extends Component{

    constructor(){
        super();
        this.state = {
            selectedFile: null
        };
    }
    
    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]})
    };

    onFileUpload = () => {
        // console.log(this.state.selectedFile);
        
        xlsxParser.onFileSelection(this.state.selectedFile).then(data => {
                // console.log(data);
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
                            // console.log(price);
                            Prices.push(priceJson);
                        });
                        // console.log(sheet);
                        fetch("http://localhost:8080/addStockPriceByCode", {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(Prices)
                        }).then(data => {console.log(data)});
                        // console.log(Prices);
                    }
                );
            });
    }

    render(){
        return <div className="col-sm-12">
            <input type="file" onChange={this.onFileChange}></input>
            <button className="btn btn-dark" onClick={this.onFileUpload}>Upload</button>
        </div>
    }
}

export default ExcelUpload;