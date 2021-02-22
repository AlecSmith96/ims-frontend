import React, { useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';


const ProductDetails = () => {
    const {state} = useLocation();
    const history = useHistory();
    const [product, setProduct] = useState({});
    const [orders, setOrders] = React.useState([{}]);
    const [purchases, setPurchases] = React.useState([{}]);


    useEffect(() => {
    async function fetchProduct() {
        await fetch(`http://localhost:8080/api/product/${state.id}`,{
            method: 'GET',
            headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`}    
        })
        .then(res => res.json())
        .then(response => setProduct(response))
        .catch(console.error)
    }
    fetchProduct();

    //GET open customer orders that contain this product
    async function fetchOrderData() {
        await fetch(`http://localhost:8080/api/orders/product/${state.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .then((response) => {setOrders(response)})
        .catch(console.error);
    }
    fetchOrderData();

    //GET open purchase orders that contain this product
    async function fetchPurchaseData() {
        await fetch(`http://localhost:8080/api/purchases/product/${state.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .then((response) => {setPurchases(response)})
        .catch(console.error);
    }
    fetchPurchaseData();
    
    console.log(JSON.stringify(orders));

    }, []);

    /**
     * Navigate to selected Purchase Order details page
     * @param {PurchaseOrder} purchase - the purchase order to navigate to
     */
    const handlePurchaseClick = (purchase) => {
        history.push({pathname:`/purchase/${purchase.id}`, state: purchase});
    }

    /**
     * Navigate to selected Customer Order details page
     * @param {CustomerOrder} order - the customer order to navigate to 
     */
    const handleOrderClick = (order) => {
        history.push({pathname:`/order/${order.id}`, state: order});
    }

    /**
     * Sends POST request to suspend this product from trading.
     */
    function suspendProduct() {
        fetch(`http://localhost:8080/api/product/suspend/${state.id}`, {
                method: 'POST',
                headers: {'Authorization': 
                                `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .catch(console.error());

        window.location.reload();
    }

    /**
     * Sends POST request to reinstate this product to allow trading.
     */
    function reinstateProduct() {
        fetch(`http://localhost:8080/api/product/reinstate/${state.id}`, {
                method: 'POST',
                headers: {'Authorization': 
                                `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .catch(console.error());

        window.location.reload();
    }

    /**
     * Product Details reders:
     * Manager function buttons for updating reorder threshold, updating reorder
     * amount and suspending a product / reinstating a product
     */
    return (
        <div>
            <center>
                <br/>
                {
                    product.suspended ? <h2 className="text-danger ml-2">[SUSPENDED]</h2> :
                    <h2/>
                }
                <div className="row col-md-10">
                    <div>
                        <Button className='btn btn-rounded my-0' onClick={() => {history.goBack()}} variant="outline-info">
                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Back
                        </Button>
                    </div>
                    <div className="col-md-1"></div>
                    <h2> {product.name} Product Details</h2>
                </div>

                {   // Manager functions not available to USER accounts
                    localStorage.getItem('authorities') === 'USER' ? <div/> :
                    <div className="btn-group btn-block col-md-10" role="group">
                        <Button className='btn btn-secondary my-0'>Update Reorder Threshold</Button>
                        <Button className='btn btn-secondary my-0'>Update Reorder Amount</Button>
                        {
                            product.suspended === false ? 
                            <Button className='btn btn-secondary my-0 bg-danger' onClick={() => { if (window.confirm('Are you sure you wish to suspend this product?')) suspendProduct()}}>Suspend Product</Button> :
                            <Button className='btn btn-secondary my-0 bg-info' onClick={() => { if (window.confirm('Are you sure you wish to reinstate this product?')) reinstateProduct()}}>Reinstate Product</Button>
                        }
                    </div>
                }
                <br/>

                {/* Product Info Table */}
                <br/>
                <table className="table table-dark col-md-8 text-center">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Sku</th>
                    <th scope="col">Price</th>
                    <th scope="col">Current Inventory</th>
                    <th scope="col">Reorder Threshold</th>
                    <th scope="col">Reorder Quantity</th>
                    <th scope="col">Supplier</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{product.id}</td>
                    <td>{product.sku}</td>
                    <td>£{product.price ? product.price.toFixed(2): -1.00}</td>
                    <td>{product.inventory_on_hand}</td>
                    <td>{product.reorder_threshold}</td>
                    <td>{product.reorder_quantity}</td>
                    <td>{product.supplier ? product.supplier.name : 'none'}</td>
                    </tr>
                </tbody>
                </table>
                <br/>
                
                {/* Customer Orders and Supplier Orders Grid */}
                <div className="container col-md-10">
                    <div className="row">
                        <div className="col">
                            <p className="lead">Customer Orders</p>
                            <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer</th> 
                                <th scope="col">Order Date</th> 
                                <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orders.length === 0 ? <center><tr><td colspan="4">No orders containing this product</td></tr></center> :
                                orders.map((order) => {
                                    const status = order.arrival_date === "null" ? "table-warning" : "table-primary";
                                    return (
                                        <tr key={order.id+order.order_date} className={status} onClick={() => handleOrderClick(order)}>
                                            <td>{order.id}</td>
                                            <td>{order.customer ? `${order.customer.title} ${order.customer.first_name} ${order.customer.last_name}` : 'none'}</td>
                                            <td>{order.order_date}</td>
                                            <td>{order.arrival_date === "null" ? 'PENDING' : 'DELIVERED'}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            </table>
                        </div>

                        <div className="col">
                            <p className="lead">Supplier Orders</p>
                            <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Supplier</th>
                                <th scope="col">Ordered On</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                purchases.length === 0 ? <center><tr><td colspan="4">No purchase orders for this product</td></tr></center> :
                                purchases.map((order) => {
                                    const status = order.arrival_date === "null" ? "table-warning" : "table-primary";
                                    return (
                                        <tr key={order.id+order.order_date} className={status} onClick={() => handlePurchaseClick(order)}>
                                            <td>{order.id}</td>
                                            <td>{order.supplier ? order.supplier.name : 'none'}</td>
                                            <td>{order.purchase_date}</td>
                                            <td>{order.arrival_date === "null" ? 'PENDING' : 'DELIVERED'}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </center>

            
            

        </div>

        
);
}

export default ProductDetails;