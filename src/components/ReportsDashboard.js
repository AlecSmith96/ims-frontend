import React from 'react';
import { Button } from 'react-bootstrap';

const ReportsDashboard = () => {
    return (
        <div>
            <h5>Reports</h5>
            <div className="row">
                <div className="col h-100">
                    <div className="btn-group-vertical">
                        <Button className="btn btn-secondary my-0">Stock Movement</Button>
                        <Button className="btn btn-secondary my-0">Order Summary</Button>
                        <Button className="btn btn-secondary my-0">Purchase Summary</Button>
                        <Button className="btn btn-secondary my-0">Waste</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsDashboard;