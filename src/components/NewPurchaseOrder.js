import React, {useEffect, useState, Fragment} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { WatchDirectoryKind } from 'typescript';
import 'react-bootstrap-typeahead/css/Typeahead.css';

/**
 * Component to show Purchase Order form to create a new Purchase Order.
 * @param {showModal, setModal} props - boolean to coniditionally render Modal and setter function.
 */
const NewPurchaseOrder = (props) => {
    const [products, setProducts] = useState([{}]);
    const [selectedSupplier, setSelectedSupplier] = useState('Choose...');
    const [fields, setFields] = useState([{}]);
    const [multiSelections, setMultiSelections] = useState([]);

    useEffect(() => {
            fetch('http://localhost:8080/api/products', {
                method: 'GET',
                headers: {
                'Authorization': `bearer ${localStorage.getItem('access_token')}`
                }})
            .then(res => res.json())
            .then((data) => {setProducts(data)})
            .catch(console.error());
    }, [])
    
      function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
      }

      function submitSupplierOrder() {
          const ids = multiSelections.map((product) => product.id);
          const data = `{"ids": ${JSON.stringify(ids)}}`;
          console.log(data);
          fetch('http://localhost:8080/api/purchase/create', {
                method: 'POST',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json'},
                body: data
            })
            .catch(console.error());
      }

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">New Purchase Order</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => submitSupplierOrder()}>
            <Modal.Body>  
            <p className="lead">Select the products you would like to submit a purchase order for:</p>
                    {/* <div className="row w-100">
                        <span className="ml-3 align-middle mr-1">Products:</span>
                    </div> */}
                    <Fragment>
                    <Form.Group style={{ marginTop: '20px' }}>
                        <Typeahead
                        id="basic-typeahead-multiple"
                        labelKey="name"
                        multiple
                        onChange={setMultiSelections}
                        options={products}
                        placeholder="Choose products..."
                        selected={multiSelections}
                        />
                    </Form.Group>
                    </Fragment>
                    <p className="lead">The quantity ordered will be the standard reorder amount for that product.</p>
                    <p className="lead">An email confirmation will be sent to the manager email for your business.</p>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={() => {props.setModal(false); setSelectedSupplier('Choose...')}}>Close</Button>
                <input className="btn btn-info" type="submit" value="Submit Order" />
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default NewPurchaseOrder;