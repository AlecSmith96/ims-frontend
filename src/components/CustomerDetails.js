import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';

/**
 * Functional Component for displaying the details and orders for a Customer.
 * @returns HTML page with Customer details.
 */
const CustomerDetails = () => {
    const [customer, setCustomer] = useState({});
    const [customerOrders, setCustomerOrders] = useState([{}]);
    const {state} = useLocation();
    const history = useHistory();
    
    /**
     * On mounting fetch Customer object and all orders for the customer.
     */
    useEffect(() => {
        async function fetchCustomer() {
            await fetch(`http://localhost:8080/api/customers/${state.id}`,{
                method: 'GET',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`}    
            })
            .then(res => res.json())
            .then(response => setCustomer(response))
            .catch(console.error)
        }
        fetchCustomer();

        async function fetchOrders() {
            await fetch(`http://localhost:8080/api/customer/${state.id}`,{
                method: 'GET',
                headers: {'Authorization': `bearer ${localStorage.getItem('access_token')}`}    
            })
            .then(res => res.json())
            .then(response => setCustomerOrders(response))
            .catch(console.error)
        }
        fetchOrders();
    }, [])

    /**
     * Navigate to OrderDetails page for selected order.
     * @param {*} order 
     */
    function handleClick(order) {
        history.push({pathname:`/order/${order.id}`, state: order});
    }

    return (
        <div>
            <center>
                <h2>{customer.title} {customer.first_name} {customer.middle_names} {customer.last_name}</h2>
            </center>

            <div className="container jumbotron col-md-9">
                <div className="row">
                    { 
                        customer.address ?
                        <address className="col">
                            {customer.address.house_number} {customer.address.line_1}<br/>
                            {customer.address.line_2}<br/>
                            {customer.address.city}<br/>
                            {customer.address.county}<br/>
                            {customer.address.post_code}
                        </address> : <div/>
                    }
                    <div className="float-right text-right col">
                        <p>{customer.email}</p>
                        <p>Tel: {customer.phone_number}</p>
                    </div>
                </div>
            </div>
            <center>
                <table className="table col-md-9">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Order Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerOrders.length === 0 ? <center><tr><td colspan="3">No orders for this customer on record</td></tr></center> :
                            customerOrders.map((order) => {
                                return(
                                    <tr key={order.id} onClick={() => handleClick(order)}>
                                        <td>{order.id}</td>
                                        <td>{order.order_date}</td>
                                        <td>{order.arrival_date === 'null' ? 'PENDING': 'DELIVERED'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </center>
        </div>
    )
}

export default CustomerDetails;