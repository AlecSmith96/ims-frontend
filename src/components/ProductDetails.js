import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';


const ProductDetails = () => {
    const {state} = useLocation();
    const [orders, setOrders] = React.useState([{}]);
    const [purchases, setPurchases] = React.useState([{}]);


    useEffect(() => {
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


    return (
        <div>
            <center>
                <br/>
                <div className="row col-md-10">
                    <div>
                        <Button className='btn btn-rounded my-0' href='/lookup' variant="outline-info">
                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Back
                        </Button>
                    </div>
                    <div className="col-md-1"></div>
                    <h2> {state.name} Product Details</h2>
                </div>

                {/* Button group for MANAGER privilages */}
                <div className="btn-group col-md-10" role="group">
                    <Button className='btn btn-secondary my-0' /*href='/lookup'*/>Update Reorder Threshold</Button>
                    <Button className='btn btn-secondary my-0' /*href='/lookup'*/>Group button 2</Button>
                    <Button className='btn btn-secondary my-0' /*href='/lookup'*/>Group button 3</Button>
                </div>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{state.id}</td>
                    <td>{state.sku}</td>
                    <td>{state.price}</td>
                    <td>{state.inventory_on_hand}</td>
                    <td>{state.reorder_threshold}</td>
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
                                orders.length === 0 ? <center><tr>No orders containing this product</tr></center> :
                                orders.map((order) => {
                                    const status = order.arrival_date === "null" ? "table-warning" : "table-primary";
                                    return (
                                        <tr key={order.id+order.order_date} className={status}>
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
                                purchases.length === 0 ? <center><tr>No purchase orders for this product</tr></center> :
                                purchases.map((order) => {
                                    const status = order.arrival_date === "null" ? "table-warning" : "table-primary";
                                    return (
                                        <tr key={order.id+order.order_date} className={status}>
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