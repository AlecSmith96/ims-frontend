import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProductLookup = (props) => {
    const history = useHistory();
    const [sku, setSku] = useState('');
    const [products, setProducts] = useState([{}]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([{}]);

    // Filter all products by characters found in text box
    const handleChange = e => {
        setSearchTerm(e.target.value);
        const results = products.filter(product => product.name.toString().toLowerCase().includes(e.target.value));
        setSearchResults(results);
      };

    useEffect(() => {   // After render send call to resource server to return all products from db
        fetch('http://localhost:8080/api/products', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setProducts(data)}) 
            .catch(console.error());
    }, []);

    // Navigate to product details page
    const handleClick = (product) => {
        history.push({pathname:`/product/${product.id}`, state: product});
    }

    const handleSkuChange = (event) => {
        setSku(event.target.value);
    }

    const searchBySku = () => {
        const product = products.find(product => product.sku.toString() === sku)

        if (product === undefined) {
            alert('No results for sku.');
        }
        else {
            history.push({pathname:`/product/${product.id}`, state: product});
        }
    } 

    return (
        <div>
            <center><h2>Product Lookup</h2></center>
            <form className="container form-inline md-form mr-auto col-md-10 mb-1" onSubmit={searchBySku}>
                <Button className="btn btn-rounded my-0" variant="outline-info" type="submit">Add New Product</Button>
            </form>
            <form className="container form-inline md-form mr-auto col-md-10" onSubmit={searchBySku}>
                <input className="form-control mr-sm-2" type="text" placeholder="Enter Sku" aria-label="Search" value={sku} onChange={handleSkuChange}/>
                <Button className="btn btn-rounded btn-sm my-0" variant="outline-info" type="submit">Search</Button>
                <label htmlFor="name" className="col-sm-2 col-form-label text-middle">Or </label>
            </form>
            <br/>
        <div className="container col-md-10">
        <input className="form-control mb-4" id="tableSearch" type="text"
            placeholder="Search for a product" value={searchTerm} onChange={handleChange}/>

        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>sku</th>
                <th>price</th>
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
                            <td>{product.price}</td>
                            <td>{product.inventory_on_hand}</td>
                            <td>{product.reorder_threshold}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        </div>
        </div>
    );
}

export default ProductLookup;
