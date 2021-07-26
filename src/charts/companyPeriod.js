// Step 1 - Include react
import React, { Component } from 'react';

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import 'react-dropdown/style.css';
import Select from 'react-select';
import FetchCompany from '../components/fetches/fetchCompany';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


class CompanyPeriod extends Component {

    constructor() {
        super();
        this.state = {
            chartData: [],
            chartConfigs: {},
            companyList: null,
            company: null,
            start: null,
            end: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const call = FetchCompany();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    // console.log(json);
                    let list = [];
                    json.map((company, key) => (
                        list.push({ "label": company['companyName'], "value": company['companyName'] })
                    ));
                    this.setState({ companyList: list });
                });
            }
        });
    }

    handleCompany(event) {
        this.setState({ company: event.value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const BodyJson = {
            "company_name": this.state.company,
            "start": this.state.start,
            "end": this.state.end
        };
        const comp = this.state.company;
        const startDate = this.state.start;
        const endDate = this.state.end;
        fetch("http://localhost:8080/findPricesBetweenDates", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(BodyJson)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let pricedata = [];
                    json.map((price, key) => (
                        pricedata.push({ label: price['date'], value: price['currentPrice'] })
                    ));
                    this.setState({chartConfigs: {
                        type: "column2d", // The chart type
                        width: "700", // Width of the chart
                        height: "400", // Height of the chart
                        dataFormat: "json", // Data type
                        dataSource: {
                            // Chart Configuration
                            chart: {
                                caption: comp + " Prices between "+ startDate + " and " + endDate,    //Set the chart caption
                                subCaption: "",             //Set the chart subcaption
                                xAxisName: "Time",           //Set the x-axis name
                                yAxisName: "Prices (in INR)",  //Set the y-axis name
                                theme: "fusion"                 //Set the theme for your chart
                            },
                            // Chart Data - from step 2
                            data: pricedata
                        }
                    }});
                    this.setState({ chartData: pricedata });
                })
            }
        });
    }

    render() {
        if (this.state.chartData.length === 0 && this.state.companyList != null) {
            return <form onSubmit={this.handleSubmit} className="col-sm-4">
                <Select
                    options={this.state.companyList}
                    placeholder="Select a company"
                    className="mb-3"
                    onChange={this.handleCompany}
                ></Select>
                <div className="row">
                    <div className="input-group mb-3">
                        <input type="date" onChange={this.handleChange} className="form-control col-sm-4" placeholder="Start date" id="start" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="date" onChange={this.handleChange} className="form-control col-sm-4" placeholder="End date" id="end" />
                    </div>
                </div>
                <div className="input-group-mb-3">
                    <input type="submit" value="Submit query" className="btn btn-primary"/>
                </div>
            </form>
        }
        else if(this.state.chartData.length !== 0){
            const configs = (this.state.chartConfigs);
            return (<ReactFC {...configs} />);
        }
        else{
            return <div>In progress</div>
        }
    }
}

export default CompanyPeriod;