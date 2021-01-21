import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';


const ProductDetails = () => {
    const {state} = useLocation();

    return (
        <div>
            <center>
                <br/>
                <div className="row col-md-10">
                    <div>
                        <Button className='text-white bg-info' href='/lookup' variant="outline-info">
                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Back
                        </Button>
                    </div>
                    <br/>
                    <p className="h2"> {state.name} Product Details</p>
                </div>

                {/* Product Info Table */}
                <br/>
                <table class="table table-dark col-md-8 text-center">
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
                    <div class="row">
                        <div class="col">
                            <p className="lead">Customer Orders</p>
                        </div>
                        <div class="col">
                            <p className="lead">Supplier Orders</p>
                        </div>
                    </div>
                </div>
            </center>

            
            

        </div>

        
);
}

export default ProductDetails;