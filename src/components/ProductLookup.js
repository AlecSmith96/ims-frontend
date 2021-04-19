import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NewProduct from './NewProduct';

/**
 * Functional component to search for a product in the database. 
 * @returns searchable HTML table of products.
 */
const ProductLookup = () => {
    const history = useHistory();
    const [sku, setSku] = useState('');
    const [products, setProducts] = useState([{}]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([{}]);
    const [showModal, setModal] = useState(false);
    const [viewSuspended, setViewSuspended] = useState(false);

    // Filter all products by characters found in text box
    const handleChange = e => {
        setSearchTerm(e.target.value);
        const results = products.filter(product => product.name.toString().toLowerCase().includes(e.target.value));
        setSearchResults(results);
      };

    // Get all products from database.
    function getProducts() {
        fetch('http://localhost:8080/api/products', {
        method: 'GET',
        headers: {
        'Authorization': `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .then((data) => {setProducts(data)}) 
        .catch(console.error());
    }

    /**
     * On mounting get all products from database.
     */
    useEffect(() => {   // After render send call to resource server to return all products from db
        getProducts();
    }, []);

    // Navigate to product details page
    const handleClick = (product) => {
        history.push({pathname:`/product/${product.id}`, state: product});
    }

    // update sku state
    const handleSkuChange = (event) => {
        setSku(event.target.value);
    }

    // search all products based on input sku value
    const searchBySku = () => {
        const product = products.find(product => product.sku.toString() === sku)

        if (product === undefined) {
            alert('No results for sku.');
        }
        else {
            history.push({pathname:`/product/${product.id}`, state: product});
        }
    } 

    // filter searchable products by suspended
    const filterSuspended = () => {
        setViewSuspended(true);
        setProducts(products.filter(product => product.suspended === true));
    }

    // set all products as searchable
    const viewAllProducts = () => {
        setViewSuspended(false);
        getProducts();
    }

    return (
        <div>
            <center><h2>Product Lookup</h2>
            {   // only show manager functions for SUPERVISOR and ADMIN users
                localStorage.getItem('authorities') === 'USER' ? 
                <div/> :
                <div className="btn-group container md-form mr-auto col-md-10 mb-3 text-center">
                    <Button className="btn btn-rounded my-0" variant="outline-info" onClick={() => {setModal(true)}}>Add New Product</Button>
                    {
                        viewSuspended === false ?
                        <Button className="btn btn-rounded my-0" variant="outline-danger" onClick={() => {filterSuspended()}} type="submit">View Suspended Products</Button> :
                        <Button className="btn btn-rounded my-0" variant="outline-info" onClick={() => {viewAllProducts()}} type="submit">View All Products</Button>
                    }
                </div>
            }
            </center>
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
        <NewProduct setModal={setModal} showModal={showModal}/>
        </div>
    );
}

export default ProductLookup;
