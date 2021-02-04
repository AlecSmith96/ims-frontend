import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';



const OrderDetails = () => {
    const {state} = useLocation();



    return (
        <div className="row col-md-10">
                    <div>
                        <Button className='btn btn-rounded my-0' href='/orders' variant="outline-info">
                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Back
                        </Button>
                    </div>
                    <div className="col-md-1"></div>
                    <h2> Details For Order #{state.id}</h2>
                </div>
    );
}

export default OrderDetails;