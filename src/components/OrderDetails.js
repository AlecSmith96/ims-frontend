import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button, Card as p} from 'react-bootstrap';



const OrderDetails = () => {
    const {state} = useLocation();



    return (
        <div>
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0' href='/orders' variant="outline-info">
                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Back
                    </Button>
                </div>

                <div className="col-md-1"></div>
                <h2> Details For Order #{state.id}</h2>
            </div>

            <div className="container col-md-10">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron">
                            <h5 className="card-title">{`${state.customer.title} ${state.customer.first_name} ${state.customer.last_name}`}</h5>
                            <p className="lead">Order Date: {state.order_date}</p>
                            <p className="lead">Status: {state.arrival_date ? 'DELIVERED' : 'PENDING'}</p>
                            {state.arrival_date ? <p className="lead">Delivered On: {state.arrival_date} </p> : <div/>}
                            <p className="lead">Total Price: £{state.totalCost}</p>
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
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;