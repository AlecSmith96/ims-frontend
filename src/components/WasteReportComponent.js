import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

/**
 * Functional component for creating an HTML waste report to be sent to the 
 * management email address.
 * @returns - HTML form.
 */
const WasteReportComponent = () => {
    const [wasteRecords, setWasteRecords] = useState([{sku: '', reason: '', quantity: 0}]);

    /**
     * Send waste records to resource server to generate HTML report.
     */
    function handleSubmit() {
        const records = `${JSON.stringify(wasteRecords)}`;        
        fetch('http://localhost:8080/api/reports/waste', {
                method: 'POST',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`,
                            'Content-Type': 'application/json'},
                body: records
            })
            .catch(console.error());
    }

    // add record to state
    function addWasteRecord() {
        const values = [...wasteRecords];
        values.push({sku: '', reason: '', quantity: 0})
        setWasteRecords(values);
    }

    // update sku value of record
    function handleSkuChange(i, event) {
        const values = [...wasteRecords];
        values[i].sku = event.target.value;
        setWasteRecords(values);
    }

    // update reason value of record
    function handleReasonChange(i, event) {
        const values = [...wasteRecords];
        values[i].reason = event.target.value;
        setWasteRecords(values);
    }

    // update quantity value of record
    function handleQuantityChange(i, event) {
        const values = [...wasteRecords];
        values[i].quantity = event.target.value;
        setWasteRecords(values);
    }

    // remove record from state
    function handleRemove(index) {
        const values = [...wasteRecords];
        values.splice(index, 1);
        setWasteRecords(values);
      }

    return (
        <div>
            <center>
                <h5>Create new waste report</h5>
                <p className="lead">Enter the Sku, reason for wastage and quantity of stock for each item.</p>
            </center>
            <form onSubmit={handleSubmit}>
                {
                        wasteRecords.map((record, index) => {
                            return (
                                <div key={index} className="form-group  col-sm-12 input-group">
                                    <input id="sku" type="text" className="form-control" value={record.sku} placeholder="Enter Sku..." onChange={e => handleSkuChange(index, e)}/>
                                    <select id="reason" className="form-control" onChange={(e) => handleReasonChange(index, e)} required>
                                        <option defaultValue>Choose...</option>
                                        <option >DAMAGED</option>
                                        <option >EXPIRED</option>
                                    </select>
                                    <input id="quantity" type="number" className="form-control" value={record.quantity} placeholder="Enter Quantity" onChange={(e) => handleQuantityChange(index, e)} required/>
                                    <button className="input-group-append form-control text-danger col-sm-2" onClick={() => handleRemove(index)}>Remove</button>
                                </div>
                            )
                        })
                }
                <div id="allergiesDiv" className="col-sm-12">
                    <Button variant="outline-info float-left" onClick={() => addWasteRecord()}>Add Waste record</Button>
                    <input className="btn btn-info float-right" type="submit" value="Submit Waste Report" />
                </div>
            </form>
            
        </div>
    )
}

export default WasteReportComponent;