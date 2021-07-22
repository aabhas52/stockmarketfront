import React, { useState } from "react";

function AddMapping() {
    const [inputList, setInputList] = useState([{ exchange: "", code: "" }]);
    const [company, setCompany] = useState("");

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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PostBody)
        }).then(response => {
            if (response.ok) {
                alert("Mappings added")
            }
            else {
                alert("Mappings not added");
            }
        })
    }

    const handleCompany = (event) => {
        setCompany(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" onChange={handleCompany} className="form-control" placeholder="Company Name" id="name" required />
                </div>
                {inputList.map((x, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <input
                                    name="exchange"
                                    placeholder="Stock Exchange Code"
                                    value={x.exchange}
                                    onChange={e => handleInputChange(e, i)}
                                />
                                <input
                                    name="code"
                                    placeholder="Company Code"
                                    value={x.code}
                                    onChange={e => handleInputChange(e, i)}
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
                <input type="submit"></input>
            </form>
        </div>
    );
}

export default AddMapping;