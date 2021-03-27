import { stringify } from 'querystring';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';
import AddNewUser from './AddNewUser';
import EditUser from './EditUser';
import '../styles/Global.css';
import NewPassword from './NewPassword';

const Dashboard = (props) => {
    const {state} = useLocation();
    const history = useHistory();
    const [lowProductStock, setLowProductStock] = useState([{}]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user") !== null)
        {
            var userObj = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user_name", userObj.user_name);
            localStorage.setItem("authorities", userObj.authorities);
            props.setStatus('logged in');
        }

        fetch('http://localhost:8080/api/products/low-stock', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
        .then(res => res.json())
        .then((data) => {setLowProductStock(data)})
        .catch(console.error());
    })

    const handleClick = (product) => {
        history.push({pathname:`/product/${product.id}`, state: product});
    }

    return (
        <div>
            <center>
            { localStorage.getItem('authenticated') === 'true' ?
                <div className="vertical-center container">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron container">
                                <h2>Low Stock</h2>
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                <table class="table table-bordered table-striped mb-0">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Stock Level</th>
                                        <th scope="col">Reorder Point</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        lowProductStock.length === 0 ? <center><tr><td colspan="4">No products low on stock!</td></tr></center> : 
                                        lowProductStock.map((product) => {
                                            return (
                                                <tr key={product.id} onClick={() => handleClick(product)}>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.inventory_on_hand}</td>
                                                    <td>{product.reorder_threshold}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                        <div className="w-100"></div>
                        <div className="col">
                            <div className="jumbotron container h-100">
                                <h2>User Accounts</h2>
                                {
                                    localStorage.getItem('authorities') === 'USER' ? 
                                    <Button className="form-control" variant="outline-info" onClick={() => setShowNewPasswordModal(true)}>Update My Password</Button>
                                    :
                                    <div>
                                        <Button className="form-control" variant="outline-info" onClick={() => setShowNewPasswordModal(true)}>Update My Password</Button>
                                        <Button className="form-control mt-1" variant="outline-info" onClick={() => setShowAddUserModal(true)}>New User</Button>
                                        <Button className="form-control mt-1" variant="warning" onClick={() => setShowEditUserModal(true)}>Edit User</Button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col">
                            <div className="jumbotron container h-100">
                                <h2>Daily Waste</h2>
                                <Button className="form-control" variant="outline-info" onClick={() => history.push('/waste')}>Submit Waste Report</Button>
                                <h2> Welcome {localStorage.getItem('user_name')} Authority: {localStorage.getItem('authorities')}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                            :
                <div className="vertical-center">
                    <div className="jumbotron container col-md-6">
                    <img
                        src={process.env.PUBLIC_URL+"/AgileInventoryLogo-black.png"}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                        <h2>Please Sign In</h2>
                    </div>
                </div>
            }
            </center>
            <AddNewUser showModal={showAddUserModal} setModal={setShowAddUserModal} />
            <EditUser showModal={showEditUserModal} setModal={setShowEditUserModal} />
            <NewPassword showModal={showNewPasswordModal} setModal={setShowNewPasswordModal} />
        </div>
    );
}

export default Dashboard;