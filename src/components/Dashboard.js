import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

const Dashboard = (props) => {
    const {state} = useLocation();

    useEffect(() => {
        if (state) {
            props.updateUsername(state.user.user_name);
            props.updateUser(state.user);
            props.updateAuthenticated(state.authenticated);
            props.updateAccessToken(state.access_token);
            props.updateTokenType(state.token_type);
            props.updateRefreshToken(state.refresh_token);
            props.updateExpiresIn(state.expires_in);
            props.updateScope(state.scope);
        }
    })

    // COULD USE REDUX TO STORE USER INFO ACROSS COMPONENTS
    return (
        <div>
            <p> Dashboard </p>
            { state && state.authenticated ?
                <div>
                    <p> Authenticated</p>
                    <p> token_type: {state.token_type}</p>
                    <p> stored access token: {state.access_token} </p>
                    <p> expires_in: {state.expires_in}</p>
                    <p> scope: {state.scope}</p>
                    <p> refresh token: {state.refresh_token}</p>
                </div>
                            :
                <p>Not Authenticated</p>
            }
        </div>
    );
}

export default Dashboard;