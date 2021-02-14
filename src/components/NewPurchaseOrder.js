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
    const [fields, setFields] = useState([{}]);


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

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
      }
    
      function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
      }
    
      function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
      }

      function submitSupplierOrder() {
          const products = JSON.stringify(fields);
          const data = `{"supplier": "${selectedSupplier}", "products": ${products}}`;

          fetch('http://localhost:8080/api/purchase/create', {
                method: 'POST',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json'},
                body: data
            })
            .then(res => res.json())
            .then((data) => {setProducts(data)})
            .catch(console.error());
      }

      // https://dev.to/email2vimalraj/dynamic-form-fields-using-react-35ci

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">New Purchase Order</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => submitSupplierOrder()}>
            <Modal.Body>
                    <p className="lead">Select the Supplier you wish to order from</p>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Supplier</label>
                        <div className="col-sm-10">
                            <select id="inputSupplier" className="form-control" onChange={(e) => filterProducts(e)} required>
                                <option defaultValue>Choose...</option>
                                {
                                    supplierNames.map((name) => <option>{name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <p className="lead">The quantity ordered will be the standard reorder amount for that product.</p>
                    <div className="row w-100">
                        <span className="ml-3 align-middle">Products:</span>
                        {selectedSupplier === 'Choose...' ? <div/> : <Button className="float-right" variant="info" type="button" onClick={() => handleAdd()}>Add</Button>}
                    </div>
                    <div className="form-group row">
                        {   // Render product selection fields
                            selectedSupplier === 'Choose...' ? <div/> :
                            fields.map((field, idx) => {
                                return (         
                                    <div className="container ml-3 mr-3">                           
                                        <div className="row mt-1" key={`${field}-${idx}`}>
                                            <select id="inputProduct" className="form-control col-10" onChange={e => handleChange(idx, e)} required>
                                                <option defaultValue>Choose...</option>
                                                {
                                                    filteredProducts.map((product) => <option>{product.name}</option>)
                                                }
                                            </select>
                                            <Button className="col btn-sm my-0" variant="info" type="button" onClick={() => handleRemove(idx)}>Remove</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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