import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';


const ProductDetails = () => {
    const {state} = useLocation();
    const [orders, setOrders] = React.useState([{}]);

    useEffect(() => {
    //GET open customer orders that contain this product
    async function fetchData() {
        await fetch(`http://localhost:8080/api/orders/product/${state.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .then((response) => {setOrders(response)})
        .catch(console.error);
    }
    fetchData();
    
    console.log(JSON.stringify(orders));

    //GET open purchase orders that contain this product
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
                    <p className="h2"> {state.name} Product Details</p>
                </div>

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
                                {/* <th scope="col">Customer</th>  */}
                                <th scope="col">Order Date</th> 
                                <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orders.length === 0 ? <center><tr>No orders containing this product</tr></center> :
                                orders.map((order) => {
                                    return (

                                        <tr key={order.id+order.order_date}>
                                            <td>{order.id}</td>
                                            {/* <td>{`${order.customer.title} ${order.customer.first_name} ${order.customer.last_name}`}</td> */}
                                            <td>{order.order_date}</td>
                                            <td>{order.arrival_date === null ? 'PENDING' : 'DELIVERED'}</td>
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
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                </tr>
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