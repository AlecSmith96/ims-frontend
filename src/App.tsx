import React, {useState} from 'react';
import './App.css';
import {Navbar, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginCallback from './components/LoginCallback';
import Dashboard from './components/Dashboard';

function App() {
  const [name, setName] = useState('');
  const history = useHistory();

  function handleLogin() {
    history.push('/login');
  }

  return (
    <div>
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
        {name !== 'null' ?
          <Navbar.Text  className='text-white'>Not signed in: <Button  className='text-white' href='/login' variant="outline-info">Sign In</Button></Navbar.Text> :
          <Navbar.Text  className='text-white'>Signed in as: <a  className='text-white' href="#login">Mark Otto</a></Navbar.Text> }
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/login" component={() => { window.location.href = 'http://localhost:9090/oauth/authorize?response_type=code&client_id=client2&scope=read'; return null; }} />
          <Route path="/oauth_callback" component={LoginCallback} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
