import React, { useEffect, useState } from "react";
import Select from 'react-select';
import FetchCompany from "../fetches/fetchCompany";


function AddMapping() {
    const [inputList, setInputList] = useState([{ exchange: "", code: "" }]);
    const [company, setCompany] = useState("");
    const [companyList, setCompanyList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const call = FetchCompany();
        call.then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = [];
                    json.map((company, _key) => (
                        list.push({ "label": company['companyName'], "value": company['companyName'] })
                    ));
                    setCompanyList(list);
                });
            }
        });
    })

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { exchange: "", code: "" }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const PostBody = {
            "company_name": company,
            "company_codes": inputList
        }
        fetch("http://localhost:8080/mapStockExchanges", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(PostBody)
        }).then(response => {
            if (response.ok) {
                setMessage('Company Codes added!');
            }
            else {
                setMessage('Company Codes not added');
            }
        })
    }

    const handleCompany = (event) => {
        setCompany(event.value);
    }

    return (
        <div>
            <form className="col-sm-4" onSubmit={handleSubmit}>
                <Select
                    options={companyList}
                    placeholder="Choose company"
                    className="col-sm-6 mb-3"
                    onChange={handleCompany}
                ></Select>
                {inputList.map((x, i) => {
                    return (
                        <div className="row" key={i}>
                            <div>
                                <input
                                    name="exchange"
                                    placeholder="Stock Exchange Code"
                                    value={x.exchange}
                                    onChange={e => handleInputChange(e, i)}
                                    className="form-control"
                                    required
                                />
                                <input
                                    name="code"
                                    placeholder="Company Code"
                                    value={x.code}
                                    onChange={e => handleInputChange(e, i)}
                                    className="form-control"
                                    required
                                />
                                <div className="btn-box">
                                    {inputList.length !== 1 && <button
                                        className="btn btn-danger mb-3"
                                        onClick={() => handleRemoveClick(i)}>-</button>}
                                    {inputList.length - 1 === i && <button className="btn btn-dark mb-3" onClick={handleAddClick}>+</button>}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <input type="submit" value="Submit details" className="btn btn-primary"></input>
                <br/><br/>
                {message}
            </form>
        </div>
    );
}

export default AddMapping;