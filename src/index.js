import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';


import { BrowserRouter} from 'react-router-dom';
// import CompanyPeriod from './charts/companyPeriod';
import App from './components/App';
// import Sample from './charts/sample';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));