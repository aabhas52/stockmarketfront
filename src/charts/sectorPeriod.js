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
import FetchSectors from "../components/fetches/fetchSectors";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


class SectorPeriod extends Component {

    constructor() {
        super();
        this.state = {
            chartData: [],
            chartConfigs: {},
            sector: null,
            sectorList: null,
            start: null,
            end: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSector = this.handleSector.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const call = FetchSectors();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    // console.log(json);
                    let list = [];
                    json.map((sector, key) => (
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
        const JsonBody = {
            sector: this.state.sector,
            start: this.state.start,
            end: this.state.end
        };
        const sector = this.state.sector;
        const startDate = this.state.start;
        const endDate = this.state.end;
        fetch("http://localhost:8080/sectorPrices", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(JsonBody)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let pricedata = [];
                    Object.entries(json).forEach(
                        (entry, _key) => (
                            pricedata.unshift({ label: entry[0], value: entry[1] })
                        )
                    );
                    // console.log(pricedata);
                    this.setState({
                        chartConfigs: {
                            type: "column2d", // The chart type
                            width: "700", // Width of the chart
                            height: "400", // Height of the chart
                            dataFormat: "json", // Data type
                            dataSource: {
                                // Chart Configuration
                                chart: {
                                    caption: sector + " Prices between " + startDate + " and " + endDate,    //Set the chart caption
                                    subCaption: "",             //Set the chart subcaption
                                    xAxisName: "Time",           //Set the x-axis name
                                    yAxisName: "Prices (in INR)",  //Set the y-axis name
                                    theme: "fusion"                 //Set the theme for your chart
                                },
                                // Chart Data - from step 2
                                data: pricedata
                            }
                        }
                    });
                    this.setState({ chartData: pricedata });
                });
            }
        });
    }

    render() {
        if (this.state.chartData.length === 0 && this.state.sectorList != null) {
            return <form className="row" onSubmit={this.handleSubmit}>
                <Select
                    options={this.state.sectorList}
                    placeholder="Select a sector"
                    className="col-sm-4 mb-3"
                    onChange={this.handleSector}
                ></Select>
                <div className="row">
                    <div className="mb-3 col-sm-4">
                        From:
                        <input type="date" onChange={this.handleChange} className="form-control" placeholder="Start date" id="start" />
                    </div>
                    <div className="mb-3 col-sm-4">
                        To:
                        <input type="date" onChange={this.handleChange} className="form-control" placeholder="End date" id="end" />
                    </div>
                </div>
                <div className="input-group-mb-3">
                    <input type="submit" className="btn btn-primary" value="Submit query"/>
                </div>
            </form>
        }
        else if (this.state.chartData.length !== 0) {
            const configs = (this.state.chartConfigs);
            return (<ReactFC {...configs} />);
        }
        else {
            return <div>Loading</div>
        }
    }
}

export default SectorPeriod;