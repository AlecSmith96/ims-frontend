import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

const Dashboard = (props) => {
    const {state} = useLocation();

    useEffect(() => {
        if (state) {
            props.updateUsername(state.user.user_name);
        }
    })

    // COULD USE REDUX TO STORE USER INFO ACROSS COMPONENTS
    return (
        <div>
            <p> Dashboard </p>
            { state && state.authenticated ?
                <div>
                    <p>Authenticated</p>
                    <p> stored access token: {state.access_token} </p>
                    <p> refresh token: {state.refresh_token}</p>
                    <p> user: {state.user.user_name}</p>
                </div>
                            :
                <p>Not Authenticated</p>
            }
        </div>
    );
}

export default Dashboard;