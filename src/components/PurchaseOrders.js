import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import NewPurchaseOrder from './NewPurchaseOrder';
import SetDeliveredPurchaseOrder from './SetDeliveredPurchaseOrder';

const PurchaseOrders = () => {
    const [purchases, setPurchases] = useState([{}]);
    const [showModal, setModal] = useState(false);                      // for displaying new purchase order modal
    const [showDeliveredModal, setDeliveredModal] = useState(false);    // for setting purchase order to delivered
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8080/api/purchases/all', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setPurchases(data)})
            .catch(console.error());
    }, []);

    // Navigate to purchase details page
    const handleClick = (purchase) => {
        history.push({pathname:`/purchase/${purchase.id}`, state: purchase});
    }

    return (
        <div className="container col-md-8">
            <center>
                <h2>Purchase Orders</h2>

                <form className="">
                    <div className="row w-100 mb-1 btn-group">
                        {/* THIS CAN BE USED TO INCLUDE BUTTONS TO FILTER TABLE */}
                        <Button className='btn btn-rounded float-right' onClick={() => setModal(true)} variant="outline-info">Create New</Button>
                        <Button className='btn btn-rounded float-right' onClick={() => setDeliveredModal(true)} variant="outline-info">Record order delivery</Button>
                        <Button className='btn btn-rounded float-right' onClick={() => history.push('/suppliers')} variant="outline-info">Supplier Search</Button>
                    </div>
                </form>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Supplier</th>
                        <th>Ordered On</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody id="purchases">
                    {
                        purchases.map((purchaseOrder) => {
                            const status = purchaseOrder.arrival_date === 'null' ? "table-warning" : "table-primary";
                            return (
                                <tr key={purchaseOrder.id} className={status} onClick={() => handleClick(purchaseOrder)} >
                                    <td>{purchaseOrder.id}</td>
                                    <td>{purchaseOrder.supplier ? purchaseOrder.supplier.name : 'none'}</td>
                                    <td>{purchaseOrder.purchase_date}</td>
                                    <td>{purchaseOrder.arrival_date === 'null' ? 'PENDING' : 'DELIVERED'}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <NewPurchaseOrder showModal={showModal} setModal={setModal} />
                <SetDeliveredPurchaseOrder showModal={showDeliveredModal} setModal={setDeliveredModal} />
            </center>
        </div>
    )
};

export default PurchaseOrders;