import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

const Dashboard = (props) => {
    const {state} = useLocation();

    useEffect(() => {
        if (state) {
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("user_name", state.user.user_name);
            localStorage.setItem('access_token', state.access_token);
            localStorage.setItem('token_type', state.token_type);
            localStorage.setItem('refresh_token', state.refresh_token);
            localStorage.setItem('expires_in', state.expires_in);
            localStorage.setItem('scope', state.scope);
        }
    })

    return (
        <div>
            <p> Dashboard </p>
            { localStorage.getItem('authenticated') === 'true' ?
                <div>
                    <p> Authenticated</p>
                    <p> token_type: {localStorage.getItem('token_type')}</p>
                    <p> stored access token: {localStorage.getItem('access_token')} </p>
                    <p> expires_in: {localStorage.getItem('expires_in')}</p>
                    <p> scope: {localStorage.getItem('scope')}</p>
                    <p> refresh token: {localStorage.getItem('refresh_token')}</p>
                </div>
                            :
                <p>Not Authenticated</p>
            }
        </div>
    );
}

export default Dashboard;