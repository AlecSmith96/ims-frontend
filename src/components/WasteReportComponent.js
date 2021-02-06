import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const WasteReportComponent = () => {
    const [products, setProducts] = useState([{}]);

    function addProductField(products) {
        setProducts(...products, '');
    }

    function handleSubmit() {

    }

    return (
        <div>
            <h5>Create new waste report</h5>
            <div id="allergiesDiv" className="form-group row  col-sm-12">
                        <h1 className="text-info h4 float-left">Products</h1>
                        <Button variant="outline-info float-right" onClick={(product) => addProductField(product)}>Add Product</Button>
                    </div>
            <form onSubmit={handleSubmit}>
                {
                        products.map((product, index) => {
                            return (
                                <div key={index} className="form-group row col-sm-12 input-group">
                                    <input type="text" className="form-control" value={product} onChange={(newAllergy) => this.addAllergyValue(newAllergy, index)} placeholder="New Allergy"/>
                                    <button className="input-group-append form-control text-danger col-sm-2" onClick={() => this.removeAllergyField(index)}>Remove</button>
                                </div>
                            )
                        })
                }
            </form>
        </div>
    )
}

export default WasteReportComponent;