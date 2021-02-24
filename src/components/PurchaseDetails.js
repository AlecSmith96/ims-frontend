import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const PurchaseDetails = () => {
    const {state} = useLocation();
    const history = useHistory();

    function handleReorder() {
        fetch(`http://localhost:8080/api/purchase/reorder/${state.id}`, {
                method: 'POST',
                headers: {'Authorization': 
                                `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(res => res.json())
        .catch(console.error());
        alert("Products reordered!")
        history.push('/purchases');
    }

    return (
        <div>
            <center>
                <br/>
            <div className="row col-md-10">
                <div>
                    <Button className='btn btn-rounded my-0' onClick={() => {history.goBack()}} variant="outline-info">Back</Button>
                </div>

                <div className="col-md-1"></div>
                    <h2> Details For Purchase Order #{state.id}</h2>
            </div>  
            <div className="container col-md-10">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron h-100 w-100 d-inline-block">
                            <p className="lead">Order Date: {state.purchase_date}</p>
                            <p className="lead">Supplier: {state.supplier ? state.supplier.name : 'none'}</p>
                            <p className="lead">Status: {state.arrival_date === "null" ? 'PENDING' : 'DELIVERED' }</p>
                            {state.arrival_date === "null" ? <div/> :<p className="lead">Delivered On: {state.arrival_date} </p>}
                            <Button variant="outline-info" onClick={() => {handleReorder()}}>Reorder</Button>
                        </div>
                    </div>
                    <div className="col h-100">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th> 
                                <th scope="col">Amount</th> 
                                </tr>
                            </thead>
                            <tbody>
                            {
                                state.products.map((product) => {
                                    return (
                                        <tr key={product.id+product.order_date}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td className="text-middle">{product.reorder_quantity}</td>
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
    )
}

export default PurchaseDetails;