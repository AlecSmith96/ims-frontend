import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap';

const SupplierDetails = () => {
    const [supplier, setSupplier] = useState({});
    const [purchaseOrders, setPurchaseOrders] = useState([{}]);
    const [supplierProducts, setSupplierProducts] = useState([{}]);
    const {state} = useLocation();
    const history = useHistory();
    
    useEffect(() => {
        async function fetchCustomer() {
            await fetch(`http://localhost:8080/api/supplier/${state.id}`,{
                method: 'GET',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`}    
            })
            .then(res => res.json())
            .then(response => setSupplier(response))
            .catch(console.error)
        }
        fetchCustomer();

        async function fetchOrders() {
            await fetch(`http://localhost:8080/api/supplier/orders/${state.id}`,{
                method: 'GET',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`}    
            })
            .then(res => res.json())
            .then(response => setPurchaseOrders(response))
            .catch(console.error)
        }
        fetchOrders();

        async function fetchProducts() {
            await fetch(`http://localhost:8080/api/supplier/products/${state.id}`,{
                method: 'GET',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`}    
            })
            .then(res => res.json())
            .then(response => setSupplierProducts(response))
            .catch(console.error)
        }
        fetchProducts();
    }, [])

    function handleClick(purchase) {
        history.push({pathname:`/purchase/${purchase.id}`, state: purchase});
    }

    function handleProductClick(product) {
        history.push({pathname:`/product/${product.id}`, state: product});
    }

    return (
        <div className="container">
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0 mt-1' onClick={() => {history.goBack()}} variant="outline-info">Back</Button>
                </div>

                <div className="col-md-1"></div>
                <h2>{supplier.name}</h2>
            </div>

            <div className="container jumbotron">
                <div className="row">
                    <div className="">
                        <p>Lead Time (Days): {supplier.lead_time}</p>
                    </div>
                </div>
            </div>
            <center>
                <h3>Available Products</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Sku</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supplierProducts.length === 0 ? <center><tr><td colspan="3">No products for this supplier on record</td></tr></center> :
                            supplierProducts.map((product) => {
                                return(
                                    <tr key={product.id} onClick={() => handleProductClick(product)}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.sku}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <h3>Orders</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Order Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchaseOrders.length === 0 ? <center><tr><td colspan="3">No purchase orders from supplier on record</td></tr></center> :
                            purchaseOrders.map((order) => {
                                return(
                                    <tr key={order.id} onClick={() => handleClick(order)}>
                                        <td>{order.id}</td>
                                        <td>{order.purchase_date}</td>
                                        <td>{order.arrival_date === 'null' ? 'PENDING': 'DELIVERED'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </center>
        </div>
    )
}

export default SupplierDetails;