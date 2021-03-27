import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';


const ReorderAmountModal = (props) => {
    const [reccommendedAmount, setReccommendedAmount] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [ADU, setADU] = useState(0);

    useEffect(() => {
        // https://www.stitchlabs.com/learning-center/safety-stock-reorder-point-lead-time-calculate-formulas/
        // https://www.shipbob.com/blog/reorder-quantity-formula/

        // get average daily usage
        fetch(`http://localhost:8080/api/product/adu/${props.id}`, {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(response => response.text())
            .then(res => setADU(res))
            .catch(console.error());

        // reccommended amount = average daily usage x lead time
        const amount = ADU * props.supplier.lead_time;
        setReccommendedAmount(amount);
    }, [props?.id])

    function handleSubmit() {
        fetch(`http://localhost:8080/api/product/update/reorder-threshold/${props.id}`, {
            method: 'POST',
            body: `{"newThreshold": "${selectedAmount}"}`,
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
        }})
        // .then(response => response.json())
        // .then(res => props.setProduct(res))
        // .then(alert('Reorder Threshold Updated!'))
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
                        <p className="lead ml-3 mr-3">Suggested reorder amount based on calculation: {reccommendedAmount}</p>
                        <p className="lead ml-3 mr-3">(Calculation: average daily sales for last 2 weeks ({ADU}) x lead time ({props.supplier.lead_time}))</p>
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