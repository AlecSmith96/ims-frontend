import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

/**
 * Functional component for rendering a modal form to update the reorder amount
 * for a selected product.
 * @param {*} props - the id of the product.
 * @returns HTML form.
 */
const ReorderAmountModal = (props) => {
    const history = useHistory();
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [ADU, setADU] = useState(0);
    const [supplier, setSupplier] = useState({});

    /**
     * On mounting get average daily usage and the supplier of product.
     */
    useEffect(() => {
        // get average daily usage
        fetch(`http://localhost:8080/api/product/adu/${props.id}`, {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(response => response.text())
        .then(res => {
            const adu = parseFloat(res);
            setADU(adu);
        })
        .catch(console.error());

        fetch(`http://localhost:8080/api/supplier/product/${props.id}`, {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
        }})
        .then(response => response.json())
        .then(res => setSupplier(res))
        .catch(console.error());
    }, [props?.id])

    /**
     * Update reorder amount for product entered by the user.
     */
    function handleSubmit() {
        fetch(`http://localhost:8080/api/product/update/reorder-amount/${props.id}`, {
            method: 'POST',
            body: `{"newAmount": ${selectedAmount}}`,
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
        }})
        .then(history.push({pathname:`/product/${props.id}`, state: props.product}))
        .catch(console.error());
    }

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">Update product Reorder Amount</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => handleSubmit()}>
            <Modal.Body>
                    <div className="form-group row">
                        <p className="lead ml-3">Select a new reorder amount for this product.</p>
                    </div>
                    <div className="form-group row">
                        <p className="lead ml-3 mr-3">Suggested Reorder Amount: {ADU * supplier.lead_time}</p>
                        <p className="lead ml-3 mr-3">(Calculation: average daily sales for last 2 weeks ({ADU}) x lead time ({supplier.lead_time}))</p>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3 mr-3">New Amount:</label>
                        <div className="">
                            <input type="number" className="form-control" onChange={(e) => setSelectedAmount(e.target.value)} required/>
                        </div>
                    </div>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={() => {props.setModal(false)}}>Close</Button>
                    <input className="btn btn-info" type="submit" value="Update Amount" />
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ReorderAmountModal;