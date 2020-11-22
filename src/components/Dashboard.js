import { render } from '@testing-library/react';
import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

const Dashboard = () => {
    const {state} = useLocation();

    return (
        <div>
            { state.authenticated ? <a href="/logout">Logout</a> : <a href="/login">Login Here</a> }
            <p> Dashboard </p>
            { state.authenticated ?
                <div>
                    <p>Authenticated</p>
                    <p> stored access token: {state.access_token} </p>
                </div>
                            :
                <p>Not Authenticated</p>
            }
            
        </div>
    );
}

export default Dashboard;