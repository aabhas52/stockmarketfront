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
import FetchSectors from '../components/fetches/fetchSectors';
import FetchCompany from '../components/fetches/fetchCompany';
import Statistics from './statistics';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

class CompanyVsSector extends Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            category: [],
            sectorList: null,
            companyList: null,
            company: null,
            sector: null,
            start: null,
            end: null,
            pricedata1: [],
            pricedata2: [],
            type: 'mscolumn2d'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlecompany = this.handlecompany.bind(this);
        this.handlesector = this.handlesector.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }

    componentDidMount() {
        const call = FetchSectors();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = [];
                    json.map((sector, _key) => (
                        list.push({ "label": sector['sectorName'], "value": sector['sectorName'] })
                    ));
                    this.setState({ sectorList: list });
                });
            }
        });
        const companyCall = FetchCompany();
        companyCall.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = [];
                    json.map((company, _key) => (
                        list.push({ "label": company['companyName'], "value": company['companyName'] })
                    ));
                    this.setState({ companyList: list });
                });
            }
        });
    }

    handlecompany(event) {
        this.setState({ company: event.value });
    }

    handlesector(event) {
        this.setState({ sector: event.value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const CompanyJson = {
            "company_name": this.state.company,
            "start": this.state.start,
            "end": this.state.end
        };
        fetch("http://localhost:8080/findPricesBetweenDates", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(CompanyJson)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    Object.entries(json).forEach((entry, _key) => (
                        this.setState({
                            category: [...this.state.category, { label: entry[0] }],
                            pricedata1: [...this.state.pricedata1, { value: entry[1] }]
                        })
                    ));
                })
            }
        });
        const SectorJson = {
            "sector": this.state.sector,
            "start": this.state.start,
            "end": this.state.end
        };
        fetch("http://localhost:8080/sectorPrices", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(SectorJson)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    Object.entries(json).forEach((entry, _key) => (
                        this.setState({
                            pricedata2: [...this.state.pricedata2, { value: entry[1] }]
                        })
                    ));
                })
            }
        });
        this.setState({ loaded: true });
    }

    render() {
        const formElement = <form className="form-group row" onSubmit={this.handleSubmit}>
            <Select
                options={this.state.companyList}
                placeholder="Choose company"
                className="col-sm-6 mb-3"
                onChange={this.handlecompany}
            ></Select>
            <Select
                options={this.state.sectorList}
                placeholder="Choose sector"
                className="col-sm-6 mb-3"
                onChange={this.handlesector}
            ></Select>
            <div className="col-sm-6 mb-3">
                From:
                <input type="date" onChange={this.handleChange} className="form-control" placeholder="Start date" id="start" />
            </div>
            <div className="col-sm-6 mb-3">
                To:
                <input type="date" onChange={this.handleChange} className="form-control" placeholder="End date" id="end" />
            </div>
            <div className="input-group-mb-3">
                <input type="submit" value="Submit query" className="btn btn-primary" />
            </div>
        </form>
        if (!this.state.loaded) {
            return formElement;
        }
        else {
            const configs = {
                type: this.state.type, // The chart type
                width: "700", // Width of the chart
                height: "400", // Height of the chart
                dataFormat: "json", // Data type
                // Chart Configuration
                dataSource: {
                    chart: {
                        exportEnabled: 1,
                        caption: "Prices comparison between " + this.state.company + " and " + this.state.sector,    //Set the chart caption
                        subCaption: "",             //Set the chart subcaption
                        xAxisName: "Date",           //Set the x-axis name
                        yAxisName: "Prices (in INR)",  //Set the y-axis name
                        theme: "fusion"                 //Set the theme for your chart
                    },
                    categories: [{ category: this.state.category }],
                    dataset: [{
                        seriesname: this.state.company,
                        data: this.state.pricedata1
                    },
                    {
                        seriesname: this.state.sector,
                        data: this.state.pricedata2
                    }]
                }
            };
            const stats1 = Statistics(this.state.pricedata1);
            const stats2 = Statistics(this.state.pricedata2);
            return <div>
                {formElement}
                <br />
                Choose chart type:
                <div onChange={this.onChangeType}>
                    <input type="radio" value="mscolumn2d" name="type" defaultChecked /> Column
                    <br />
                    <input type="radio" value="msline" name="type" /> Line
                </div>
                <br />
                <div className="row">
                    <ReactFC {...configs} className="col-sm-6" />
                    <div className="col-sm-4 card">
                        <h3 className="card-title">Chart statistics</h3> <br />
                        <div className="card-body">
                            <h5>Series: {this.state.company} </h5>
                            Number of records: {stats1.count} <br />
                            Average price: {stats1.avg} <br />
                            Maximum price: {stats1.max} <br />
                            Minimum price: {stats1.min} <br />
                            <br />
                            <h5>Series: {this.state.sector} </h5>
                            Number of records: {stats2.count} <br />
                            Average price: {stats2.avg} <br />
                            Maximum price: {stats2.max} <br />
                            Minimum price: {stats2.min} <br />
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}

export default CompanyVsSector;