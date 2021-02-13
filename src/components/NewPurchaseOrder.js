import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

/**
 * Component to show Purchase Order form to create a new Purchase Order.
 * @param {showModal, setModal} props - boolean to coniditionally render Modal and setter function.
 */
const NewPurchaseOrder = (props) => {
    const [supplierNames, setSupplierNames] = useState(['']);
    const [products, setProducts] = useState([{}]);
    const [filteredProducts, setFilteredProducts] = useState([{}])
    const [selectedSupplier, setSelectedSupplier] = useState('Choose...');

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

            //get products
            fetch('http://localhost:8080/api/products', {
                method: 'GET',
                headers: {
                'Authorization': `bearer ${localStorage.getItem('access_token')}`
                }})
            .then(res => res.json())
            .then((data) => {setProducts(data)})
            .catch(console.error());
    }, [])

    function filterProducts(e) {
        setSelectedSupplier(e.target.value);
        const filtered = products.filter(product => product.supplier.name === e.target.value);
        setFilteredProducts(filtered);
    }

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">New Purchase Order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Supplier</label>
                        <div className="col-sm-10">
                            <select id="inputSupplier" className="form-control" onChange={(e) => filterProducts(e)}>
                                <option defaultValue>Choose...</option>
                                {
                                    supplierNames.map((name) => <option>{name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row col-md-10">
                        <label for="inputProduct1" className="form-control">Add Product</label>
                        {
                            selectedSupplier === 'Choose...' ? <div/> :
                            <select id="inputProduct" className="form-control" >
                                <option defaultValue>Choose...</option>
                                {
                                    filteredProducts.map((product) => <option>{product.name}</option>)
                                }
                            </select>
                        }
                    </div>
                    <p>Select products</p>
                </form>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={() => props.setModal(false)}>Close</Button>
                <Button variant="info">Submit Order</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewPurchaseOrder;