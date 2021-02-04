import { stringify } from 'querystring';
import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

const Dashboard = (props) => {
    const {state} = useLocation();

    useEffect(() => {
        // set user credentials 
        // if (state) {
        //     localStorage.setItem("authenticated", "true");
        //     localStorage.setItem("user_name", state.user.user_name);
        //     localStorage.setItem('access_token', state.access_token);
        //     localStorage.setItem('token_type', state.token_type);
        //     localStorage.setItem('refresh_token', state.refresh_token);
        //     localStorage.setItem('expires_in', state.expires_in);
        //     localStorage.setItem('scope', state.scope);
        //     localStorage.setItem('authorities', state.user.authorities);
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
                <div className="jumbotron align-middle col-md-6">
                    <h2> Welcome {localStorage.getItem('user_name')}</h2>
                    <h3>Authority: {localStorage.getItem('authorities')}</h3>
                </div>
                            :
                <div className="jumbotron align-middle col-md-6">
                    <h2>Please Sign In</h2>
                </div>
            }
            </center>
        </div>
    );
}

export default Dashboard;