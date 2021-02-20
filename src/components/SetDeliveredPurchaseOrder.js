import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { WatchDirectoryKind } from 'typescript';

/**
 * Component to set a purchase order as delivered for todays.
 * @param {showModal, setModal} props - boolean to coniditionally render Modal and setter function.
 */
const SetDeliveredPurchaseOrder = (props) => {
    const [selectedSupplier, setSelectedSupplier] = useState('Choose...');
    const [purchaseNumber, setPurchaseNumber] = useState('');
    const [reportResponse, setReportResponse] = useState('');   // set html report response to this

    function submitSupplierOrder() {
          fetch(`http://localhost:8080/api/purchase/delivered/${purchaseNumber}`, {
                method: 'POST',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json'}
            })
            .catch(console.error());
    }

    const handleChange = (e) => {
        setPurchaseNumber(e.target.value);
    }

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">Record Purchase Order Delivery</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => submitSupplierOrder()}>
            <Modal.Body>
                    <p className="lead">Select the Purchase Order Number that was just delivered</p>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Purchase #</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="text" placeholder="1234" onChange={handleChange}/>
                        </div>
                    </div>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={() => {props.setModal(false)}}>Close</Button>
                <input className="btn btn-info" type="submit" value="Submit Order" />
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default SetDeliveredPurchaseOrder;