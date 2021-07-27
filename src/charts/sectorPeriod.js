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
import FetchSector from '../components/fetches/fetchSectors';
import Statistics from './statistics';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

class SectorPeriod extends Component {

    constructor() {
        super();
        this.state = {
            chartData: [],
            sectorList: null,
            sector: null,
            start: null,
            end: null,
            type: 'column2d'
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSector = this.handleSector.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }

    componentDidMount() {
        const call = FetchSector();
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
    }

    handleSector(event) {
        this.setState({ sector: event.value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const BodyJson = {
            "sector": this.state.sector,
            "start": this.state.start,
            "end": this.state.end
        };
        fetch("https://stock-market-back.herokuapp.com/sectorPrices", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(BodyJson)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let pricedata = [];
                    Object.entries(json).forEach((entry, _key) => (
                          pricedata = [...pricedata, { label:entry[0], value: entry[1] }]
                    ));
                    this.setState({ chartData: pricedata });
                })
            }
        });
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    render() {
        const formElement = (
            <form onSubmit={this.handleSubmit} className="col-sm-4">
                <Select
                    options={this.state.sectorList}
                    placeholder="Select sector"
                    className="mb-3"
                    onChange={this.handleSector}
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
        );
        if (this.state.chartData.length === 0 && this.state.sectorList != null) {
            return formElement;
        }
        else if(this.state.chartData.length !== 0){
            const configs = {
                exportEnabled: 1,
                type: this.state.type, // The chart type
                width: "700", // Width of the chart
                height: "400", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    // Chart Configuration
                    chart: {
                        caption: this.state.sector + " Prices between "+ this.state.start + " and " + this.state.end,    //Set the chart caption
                        subCaption: "",             //Set the chart subcaption
                        xAxisName: "Date",           //Set the x-axis name
                        yAxisName: "Prices (in INR)",  //Set the y-axis name
                        theme: "fusion"                 //Set the theme for your chart
                    },
                    // Chart Data - from step 2
                    data: this.state.chartData
                }
            };
            const stats = Statistics(this.state.chartData);
            return <div>
                {formElement}
                <br/>
                Choose chart type:
                <div onChange={this.onChangeType}>
                    <input type="radio" value="column2d" name="type" defaultChecked/> Column
                    <br/>
                    <input type="radio" value="line" name="type" /> Line
                </div>
                <br/>
                <div className="row">
                    <ReactFC {...configs} className="col-sm-6" />
                    <div className="col-sm-4 card">
                        <h3 className="card-title">Chart statistics</h3> <br />
                        <div className="card-body">
                            Number of records: {stats.count} <br />
                            Average price: {stats.avg} <br />
                            Maximum price: {stats.max} <br />
                            Minimum price: {stats.min} <br />
                        </div>
                    </div>
                </div>
            </div>;
        }
        else{
            return <div>In progress</div>
        }
    }
}

export default SectorPeriod;