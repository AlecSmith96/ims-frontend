import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';


const SupplierSearch = () => {
    const history = useHistory();
    const [suppliers, setSuppliers] = React.useState([{}]);
    const [searchResults, setSearchResults] = React.useState([{}]);
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/suppliers/all', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setSuppliers(data)}) 
            .catch(console.error());
    }, []);

    // Navigate to customer details page
    const handleClick = (supplier) => {
        history.push({pathname:`/supplier/${supplier.id}`, state: supplier});
    }

    // Filter all customers by characters found in text box
    const handleChange = e => {
        setSearchTerm(e.target.value);
        const results = suppliers.filter(supplier => supplier.id.toString().toLowerCase().includes(e.target.value) || 
                                        supplier.name.toString().toLowerCase().includes(e.target.value));
        setSearchResults(results);
      };

    return (
        <div className="container col-md-10">
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0 mt-1' onClick={() => {history.goBack()}} variant="outline-info">Back</Button>
                </div>

                <div className="col-md-1"></div>
                <h2>Search for a Supplier</h2>
            </div>

            <input className="form-control mb-4" id="tableSearch" type="text"
            placeholder="Search for a Customer" value={searchTerm} onChange={handleChange}/>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody id="suppliers">
                {
                    searchResults.map((suppliers) => {
                        return (
                            <tr key={suppliers.id} onClick={() => handleClick(suppliers)}>
                                <td>{suppliers.id}</td>
                                <td>{suppliers.name}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default SupplierSearch;