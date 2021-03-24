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
        })

    return (
        <div>
            <center>
            { localStorage.getItem('authenticated') === 'true' ?
                <div className="vertical-center container">
                        <div className="row">
                            <div className="col">
                                <div className="jumbotron container">
                                    <h2> Welcome {localStorage.getItem('user_name')}</h2>
                                    <h3>Authority: {localStorage.getItem('authorities')}</h3>
                                </div>
                            </div>
                            <div className="col">
                                <div className="jumbotron container">
                                    <h2>Products close to reorder point</h2>
                                </div>
                            </div>
                            <div className="w-100"></div>
                            <div className="col">
                                <div className="jumbotron container ">
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
                                <div className="jumbotron container">
                                    <h2>Daily Waste</h2>
                                    <Button className="form-control" variant="outline-info" onClick={() => history.push('/waste')}>Submit Waste Report</Button>
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