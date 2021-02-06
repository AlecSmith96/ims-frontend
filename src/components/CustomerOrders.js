import React, { useState, useEffect } from 'react';
import { MDBDataTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { useHistory } from 'react-router-dom';

const CustomerOrders = () => {
    const history = useHistory();
    const [orders, setOrders] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:8080/api/orders/all', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setOrders(data)})
            .catch(console.error());
    }, []);

    // Navigate to purchase details page
    const handleClick = (order) => {
        history.push({pathname:`/order/${order.id}`, state: order});
    }
    
      return (
        <>
        <center>
            <h2>Customer Orders</h2>
                <div className="col-md-8">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Ordered On</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody id="orders">
                    {
                        orders.map((order) => {
                            const status = order.arrival_date === "null" ? "table-warning" : "table-primary";
                            return (
                                <tr key={order.id} className={status} onClick={() => handleClick(order)}>
                                    <td>{order.id}</td>
                                    <td>{order.customer ? `${order.customer.title} ${order.customer.first_name} ${order.customer.last_name}` : 'none'}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.arrival_date === "null" ? 'PENDING' : 'DELIVERED'}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                {/* // https://mdbootstrap.com/docs/react/tables/pagination/ */}
            </div>
            </center>
        </>
      );
}

export default CustomerOrders;

// https://medium.com/@gustavo.ponce.ch/generating-pdf-documents-using-java-a29f90fbbd52