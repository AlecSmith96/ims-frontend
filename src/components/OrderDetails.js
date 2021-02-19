import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button, Card as p} from 'react-bootstrap';



const OrderDetails = () => {
    const {state} = useLocation();

    return (
        <div>
            <center>
                <br/>
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0' href='/orders' variant="outline-info">Back</Button>
                </div>

                <div className="col-md-1"></div>
                <h2> Details For Order #{state.id}</h2>
            </div>

            <div className="container col-md-10">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron h-100 w-100 d-inline-block">
                            <h5 className="card-title">{`${state.customer.title} ${state.customer.first_name} ${state.customer.last_name}`}</h5>
                            <div className="">
                                <address>
                                Order Date: {state.order_date}<br/>
                                {state.customer.address.house_number} {state.customer.address.line_1}<br/>
                                {state.customer.address.city}<br/>
                                {state.customer.address.county}<br/>
                                {state.customer.address.post_code}<br/>
                                </address>
                            </div>
                            <p className="lead">Status: {state.arrival_date === "null" ? 'PENDING' : 'DELIVERED' }</p>
                            {state.arrival_date === "null" ? <div/> :<p className="lead">Delivered On: {state.arrival_date} </p>}
                        </div>
                    </div>
                    <div className="col">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th> 
                                <th scope="col">Price</th> 
                                </tr>
                            </thead>
                            <tbody>
                            {
                                state.products.map((product) => {
                                    return (
                                        <tr key={product.id+product.order_date}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td className="text-right" >£{product.price.toFixed(2)}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="table-info">
                                <td className="text-right" colspan="2">Total Cost:</td>
                                <td className="text-right" >£{state.totalCost}</td>
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

export default OrderDetails;