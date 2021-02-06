import { stringify } from 'querystring';
import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import '../styles/Global.css';

const Dashboard = (props) => {
    const {state} = useLocation();

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
                <div className="vertical-center">
                    <div className="jumbotron container col-md-6">
                        <h2> Welcome {localStorage.getItem('user_name')}</h2>
                        <h3>Authority: {localStorage.getItem('authorities')}</h3>
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
        </div>
    );
}

export default Dashboard;