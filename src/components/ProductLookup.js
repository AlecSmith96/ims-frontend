import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

const ProductLookup = (props) => {
    const history = useHistory();
    const [products, setProducts] = useState([{}]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([{}]);
    const handleChange = e => {
        setSearchTerm(e.target.value);
        const results = products.filter(product => product.name.toString().toLowerCase().includes(e.target.value));
        setSearchResults(results);
      };

    useEffect(() => {
        fetch('http://localhost:8080/api/products', {
            method: 'GET',
            headers: {
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDkzNjcxMzQsInVzZXJfbmFtZSI6ImFsZWMiLCJhdXRob3JpdGllcyI6WyJyZWFkIl0sImp0aSI6IjU4N2Y0ZWJmLThlZDgtNDRiNi1iYjE3LWJkZDlhNDY1YTEwMyIsImNsaWVudF9pZCI6ImNsaWVudDIiLCJzY29wZSI6WyJyZWFkIl19.akppqVeFAgSDX_o_0xOE_Pvv5jNJbhSmaDTuQxqUUcI'
            }})
            .then(res => res.json())
            .then((data) => {setProducts(data)})
            .catch(console.error());
    }, []);

    const handleClick = (product) => {
        history.push({pathname:`/product/${product.id}`, state: product});
    }

    return (
        <>
            <p>Product Lookup</p>
        <div className="container col-md-10">
        <input className="form-control mb-4" id="tableSearch" type="text"
            placeholder="Search for a product" value={searchTerm} onChange={handleChange}/>

        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>sku</th>
                <th>Inventory On Hand</th>
                <th>Reorder Threshold</th>
            </tr>
            </thead>
            <tbody id="products">
            {
                searchResults.map((product) => {
                    return (
                        <tr key={product.id} onClick={() => handleClick(product)}>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.inventory_on_hand}</td>
                            <td>{product.reorder_threshold}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        </div>
        </>
    );
}

export default ProductLookup;
