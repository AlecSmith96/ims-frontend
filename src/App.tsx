import React, {useState} from 'react';
import './App.css';
import {Navbar, Button, Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginCallback from './components/LoginCallback';
import Dashboard from './components/Dashboard';
import ProductLookup from './components/ProductLookup';
import ProductDetails from './components/ProductDetails';
import CustomerOrders from './components/CustomerOrders';
import PurchaseOrders from './components/PurchaseOrders';
import OrderDetails from './components/OrderDetails';
import ReportsDashboard from './components/ReportsDashboard';
import PurchaseDetails from './components/PurchaseDetails';

function App() {
  const [status, updateStatus] = useState('');

  return (
    <div>
      {/* Navbar element containing links to relevant pages for the user. */}
      <Navbar className='bg-dark'>
          <Navbar.Brand className='text-white' href="/">
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
          
            {localStorage.getItem('authenticated') === null ? 
            <div/>
            : 
            <Nav className="mr-auto">
              <Nav.Link className="text-white" href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link className="text-white" href="/lookup">Product Lookup</Nav.Link>
              <Nav.Link className="text-white" href="/orders">Customer Orders</Nav.Link>
              <Nav.Link className="text-white" href="/purchases">Supplier Orders</Nav.Link>
              {localStorage.getItem('authorities') === 'ADMIN' || 'MANAGER' ? 
              <Nav.Link className="text-white" href="/reports">Reports</Nav.Link> :
              <Nav.Link className="text-white" href="/waste">Waste Report</Nav.Link>
              }
              </Nav>
            }
        {localStorage.getItem('user_name') === null ?
          <Navbar.Text  className='text-white'>Not signed in: <Button  className='text-white' href='/login' variant="outline-info">Sign In</Button></Navbar.Text> :
          <Navbar.Text  className='text-white'>Signed in as: {localStorage.getItem('user_name')} <Button onClick={() => {localStorage.clear(); /*updateStatus('logged out');*/ }} href="/logout" className='text-white' variant="outline-info">Sign Out</Button></Navbar.Text> }
        </Navbar.Collapse>
      </Navbar>
      {/* SIGN OUT BUTTON WORKS, BUT USER CREDENTIALS STILL STORED IN LOCAL STORAGE */}
      
      {/* Router provides mappings for paths to the components to be rendered for them. */}
      <Router>
        <Switch>
          <Redirect from="/" to="/dashboard" exact />
          <Route path="/login" component={() => { window.location.href = 'http://localhost:9090/oauth/authorize?response_type=code&client_id=client2&scope=read'; return null; }} />
          <Route path="/logout" component={() => { window.location.href = 'http://localhost:9090/logout'; return null; }} />
          <Route path="/oauth_callback" component={LoginCallback} />
          <Route path="/dashboard" component={() => <Dashboard setStatus={(status: React.SetStateAction<string>) => updateStatus(status)}/>} />
          <Route path="/lookup" component={() => <ProductLookup />}/>
          <Route path="/orders" component={() => <CustomerOrders />}/>
          <Route path="/purchases" component={() => <PurchaseOrders />}/>
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/order/:id" component={OrderDetails} />
          <Route path="/purchase/:id" component={PurchaseDetails} />
          <Route path="/reports" component={ReportsDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
