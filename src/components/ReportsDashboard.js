import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import WasteReportComponent from './WasteReportComponent';

const ReportsDashboard = () => {
    const [reportState, setReportState] = useState('');

    return (
        <div className="text-center">
            <h5>Reports</h5>
                <div className="col h-100">
                    <div className="btn-group">
                        <Button className="btn btn-secondary my-0">Stock Movement</Button>
                        <Button className="btn btn-secondary my-0">Order Summary</Button>
                        <Button className="btn btn-secondary my-0">Purchase Summary</Button>
                        <Button className="btn btn-secondary my-0" onClick={() => setReportState('waste')}>Waste Reports</Button>
                    </div>
                </div>
                <div className="col">
                    {reportState === 'waste' ? <WasteReportComponent/> : <div/>}
                </div>
            </div>
    );
}

export default ReportsDashboard;