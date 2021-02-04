import React, { useState, useEffect } from 'react';
import { MDBDataTable, MDBTableHead, MDBTableBody } from 'mdbreact';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([{}]);
    const columns = [
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Customer',
            field: 'customer',
            sort: 'asc'
        },
        {
            label: 'Order Date',
            field: 'order_date',
            sort: 'asc'
        },
        {
            label: 'Arrival Date',
            field: 'arrival_date',
            sort: 'asc'
        },
    ]

    useEffect(() => {
        fetch('http://localhost:8080/api/orders/homepage', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
            .then(res => res.json())
            .then((data) => {setOrders(data)})
            .catch(console.error());
    }, []);
    
      return (
        <>
        <center>
            <h2>Customer Orders</h2>
                <div className="col-md-12">
                <MDBDataTable responsive /*data={data}*/>
                    <MDBTableHead columns={columns} />
                    <MDBTableBody rows={orders} />
                </MDBDataTable>
                {/* // https://mdbootstrap.com/docs/react/tables/pagination/ */}
            </div>
            </center>
        </>
      );
}

export default CustomerOrders;

// https://medium.com/@gustavo.ponce.ch/generating-pdf-documents-using-java-a29f90fbbd52