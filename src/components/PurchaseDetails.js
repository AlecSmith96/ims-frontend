import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const PurchaseDetails = () => {
    const {state} = useLocation();

    return (
        <div>
            <center>
                <br/>
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0' href='/purchases' variant="outline-info">Back</Button>
                </div>

                <div className="col-md-1"></div>
                    <h2> Details For Order #{state.id}</h2>
            </div>  
            </center>      
        </div>
    )
}

export default PurchaseDetails;