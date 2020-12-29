import React, {useState} from 'react';
import './App.css';
import {Navbar, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginCallback from './components/LoginCallback';
import Dashboard from './components/Dashboard';

function App() {
  //Setting global state for application
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [access_token, setAccessToken] = useState('');
  const [token_type, setTokenType] = useState('');
  const [refresh_token, setRefreshToken] = useState('');
  const [expires_in, setExpiresIn] = useState('');
  const [scope, setScope] = useState('');

  return (
    <div>
      {/* Navbar element containing links to relevant pages for the user. */}
      <Navbar className='bg-dark'>
          <Navbar.Brand className='text-white' href="#home">
          <img
            src={process.env.PUBLIC_URL+"/AgileInventoryLogo.png"}
            width="159"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {name === '' ?
          <Navbar.Text  className='text-white'>Not signed in: <Button  className='text-white' href='/login' variant="outline-info">Sign In</Button></Navbar.Text> :
          <Navbar.Text  className='text-white'>Signed in as: {name} <Button  className='text-white' href='/login' variant="outline-info">Sign Out</Button></Navbar.Text> }
        </Navbar.Collapse>
      </Navbar>
      
      {/* Router provides mappings for paths to the components to be rendered for them. */}
      <Router>
        <Switch>
          <Route path="/login" component={() => { window.location.href = 'http://localhost:9090/oauth/authorize?response_type=code&client_id=client2&scope=read'; return null; }} />
          <Route path="/oauth_callback" component={LoginCallback} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
        <Dashboard updateUsername={(username: React.SetStateAction<string>) => setName(username)} updateUser={(user: React.SetStateAction<object>) => setUser(user)}
                    updateAuthenticated={(authenticated: React.SetStateAction<boolean>) => setAuthenticated(authenticated)} updateAccessToken={(access_token: React.SetStateAction<string>) => setAccessToken(access_token)}
                    updateTokenType={(token_type: React.SetStateAction<string>) => setTokenType(token_type)} updateRefreshToken={(refresh_token: React.SetStateAction<string>) => setRefreshToken(refresh_token)}
                    updateExpiresIn={(expires_in: React.SetStateAction<string>) => setExpiresIn(expires_in)} updateScope={(scope: React.SetStateAction<string>) => setScope(scope)}/>
      </Router>
    </div>
  );
}

export default App;
