import React, {useEffect, useState} from 'react';

const PurchaseOrders = () => {
    const [purchases, setPurchases] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:8080/api/purchases/all', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setPurchases(data)})
            .catch(console.error());
    }, []);

    // Navigate to purchase details page
    const handleClick = (purchase) => {
        // history.push({pathname:`/purchase/${purchase.id}`, state: purchase});
    }

    return (
        <div className="container col-md-8">
            <center>
                <h2>Purchase Orders</h2>

                <form className="form-control">
                    <div className="row">
                        {/* THIS CAN BE USED TO INCLUDE BUTTONS TO FILTER TABLE */}
                    </div>
                </form>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Supplier</th>
                        <th>Ordered On</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody id="purchases">
                    {
                        purchases.map((purchaseOrder) => {
                            const status = purchaseOrder.arrival_date === null ? "table-warning" : "table-primary";
                            return (
                                <tr key={purchaseOrder.id} className={status} onClick={() => handleClick(purchaseOrder)} >
                                    <td>{purchaseOrder.id}</td>
                                    <td>{purchaseOrder.supplier ? purchaseOrder.supplier.name : 'none'}</td>
                                    <td>{purchaseOrder.purchase_date}</td>
                                    <td>{purchaseOrder.arrival_date === null ? 'PENDING' : 'DELIVERED'}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </center>
        </div>
    )
};

export default PurchaseOrders;