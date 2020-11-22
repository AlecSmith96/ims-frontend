import React, {useState} from 'react';
import './App.css';
import {Navbar, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const history = useHistory();

  function handleLogin() {
    history.push('/login');
  }

  return (
    <div>
      <Navbar className='bg-dark'>
          <Navbar.Brand className='text-white' href="#home">[IMS-Name]</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {name !== 'null' ?
          <Navbar.Text  className='text-white'>Not signed in: <Button  className='text-white' href='/login' variant="outline-info">Sign In</Button></Navbar.Text> :
          <Navbar.Text  className='text-white'>Signed in as: <a  className='text-white' href="#login">Mark Otto</a></Navbar.Text> }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
