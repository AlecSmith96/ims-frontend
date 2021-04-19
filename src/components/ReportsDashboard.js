import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import WasteReportComponent from './WasteReportComponent';
import StockMovementComponent from './StockMovementComponent';
import OrderSummaryComponent from './OrderSummaryComponent';
import PurchaseSummaryComponent from './PurchaseSummaryComponent';

/**
 * Functional Component to render manager dashboard for all report generation.
 * @returns - HTML component.
 */
const ReportsDashboard = () => {
    const [reportState, setReportState] = useState('');

    return (
        <div className="text-center">
            <h2>Reports</h2>
            <p className="lead">Select the report you would like to generate. All reports will be emailed to the manager email address.</p>
                <div className="col h-100">
                    <div className="btn-group">
                        <Button className="btn btn-secondary my-0" onClick={() => setReportState('stock-movement')}>Stock Movement</Button>
                        <Button className="btn btn-secondary my-0" onClick={() => setReportState('order-summary')}>Order Summary</Button>
                        <Button className="btn btn-secondary my-0" onClick={() => setReportState('purchase-summary')}>Purchase Summary</Button>
                        <Button className="btn btn-secondary my-0" onClick={() => setReportState('waste')}>Waste Reports</Button>
                    </div>
                </div>
                <div className="col">
                    {reportState === 'stock-movement' ? <StockMovementComponent/> : <div/>}
                    {reportState === 'order-summary' ? <OrderSummaryComponent/> : <div/>}
                    {reportState === 'purchase-summary' ? <PurchaseSummaryComponent/> : <div/>}
                    {reportState === 'waste' ? <WasteReportComponent/> : <div/>}
                </div>
        </div>
    );
}

export default ReportsDashboard;