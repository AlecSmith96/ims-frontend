import React, { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap';


const NewProduct = (props) => {
    const [supplierNames, setSupplierNames] = useState(['']);

    useEffect(() => {
        //get supplier names
        fetch('http://localhost:8080/api/suppliers/all-names', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
        .then(res => res.json())
        .then((data) => {setSupplierNames(data)})
        .catch(console.error());
    }, [])

    

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">Add a new Product for trading</Modal.Title>
            </Modal.Header>

            <form /*onSubmit={() => submitSupplierOrder()}*/>
            <Modal.Body>
                    <p className="lead">Product Details:</p>
                    <div className="form-group row">
                        <label for="inputName" className="col-form-label ml-3">Name</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="text" placeholder="Pepsi Max 330ml" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSku" className="col-form-label ml-3">Sku</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="text" placeholder="12345678" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputStartingInventory" className="col-form-label ml-3">Starting Inventory</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="number" min="1" step="any" placeholder="100" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputReorderThreshold" className="col-form-label ml-3">Reorder Threshold</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="number" min="1" step="any" placeholder="20" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputPrice" className="col-form-label ml-3">Price</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="number" min="0.01" step="any" placeholder="1.00" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputReorderAmount" className="col-form-label ml-3">Reorder Amount</label>
                        <div className="col-sm-9">
                            <input className="form-control" type="number" min="1" step="any" placeholder="100" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Supplier</label>
                        <div className="col-sm-10">
                            <select id="inputSupplier" className="form-control" required>
                                <option defaultValue>Choose...</option>
                                {
                                    supplierNames.map((name) => <option>{name}</option>)
                                }
                            </select>
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

export default NewProduct;