import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

/**
 * Functional Component for displaying all Customers in a searchable table.
 * @returns Searchable table.
 */
const CustomerSearch = () => {
    const history = useHistory();
    const [customers, setCustomers] = React.useState([{}]);
    const [searchResults, setSearchResults] = React.useState([{}]);
    const [searchTerm, setSearchTerm] = React.useState('');

    /**
     * On mounting return all customer objects.
     */
    useEffect(() => {
        fetch('http://localhost:8080/api/customers/all', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setCustomers(data)}) 
            .catch(console.error());
    }, []);

    // Navigate to customer details page
    const handleClick = (customer) => {
        history.push({pathname:`/customer/${customer.id}`, state: customer});
    }

    // Filter all customers by characters found in text box
    const handleChange = e => {
        setSearchTerm(e.target.value);
        const results = customers.filter(customer => customer.first_name.toString().toLowerCase().includes(e.target.value) || 
                                        customer.last_name.toString().toLowerCase().includes(e.target.value) ||
                                        customer.email.toString().toLowerCase().includes(e.target.value) ||
                                        customer.phone_number.toString().toLowerCase().includes(e.target.value));
        setSearchResults(results);
      };

    return (
        <div className="container col-md-10">
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0 mt-1' onClick={() => {history.goBack()}} variant="outline-info">Back</Button>
                </div>

                <div className="col-md-1"></div>
                <h2>Search for a Customer</h2>
            </div>

            <input className="form-control mb-4" id="tableSearch" type="text"
            placeholder="Search for a Customer" value={searchTerm} onChange={handleChange}/>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                </tr>
                </thead>
                <tbody id="products">
                {
                    searchResults.map((customer) => {
                        return (
                            <tr key={customer.id} onClick={() => handleClick(customer)}>
                                <td>{customer.title}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone_number}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerSearch;