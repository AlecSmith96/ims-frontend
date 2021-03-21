import React, { useState }  from 'react';

const StockMovementComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    function submitStockMovementRequest() {
        fetch(`http://localhost:8080/api/reports/stock-movement/${startDate}/${endDate}`, {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .catch(console.error());
            alert('The report has been emailed to the manager emaail address.');
    }

    return (
        <div>
            <p className="lead mt-5"> View all Stock Movemenets for a given time period </p>

            <form className="container col-md-10" onSubmit={() => submitStockMovementRequest()}>
                <div className="container col-md-6">
                    <div className="form-group row">
                        <p className="lead col-form-label">From: </p>
                        <div className="col-sm-10">
                            <input className="form-control" type="date" id="start" name="trip-start" placeholder="2020-07-22" min="2020-01-01" max="2024-12-31" onChange={(e) => setStartDate(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-group row mt-1">
                        <p className="lead col-form-label pr-3">To: </p>
                        <div className="col-sm-10">
                            <input className="form-control" type="date" id="start" name="trip-start" min="2020-01-01" max="2024-12-31" onChange={(e) => setEndDate(e.target.value)}></input>
                        </div>
                    </div>
                </div>
                
                <input className="btn btn-info mt-4" type="submit" value="Submit Report Request" />
            </form>
        </div>
    )
}

export default StockMovementComponent;