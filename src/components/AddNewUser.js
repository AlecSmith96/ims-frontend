import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const AddNewUser = (props) => {
    const [roles, setRoles] = useState([{}]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    function submitNewUser() {
        var json = `{"username": "${username}", "email": "${email}", 
                                "password": "${password}", "role":"${role}"}`;

        fetch('http://localhost:9090/users/add', {
            method: 'POST',
            body: json,
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(alert('New user added to system!'))
        .catch(console.error());
    }

    useEffect(() => {
        fetch('http://localhost:9090/users/roles', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
        .then(res => res.json())
        .then((data) => {setRoles(data)})
        .catch(console.error());
    }, [])

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">Create new User Account</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => submitNewUser()}>
            <Modal.Body>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Username:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control mr-3 " onChange={(e) => setUsername(e.target.value)} placeholder="Enter Name..." required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3 mr-4">Email:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control mr-3 pull-right" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address..." required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3 mr-1">Password:</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="..." required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Authority:</label>
                        <div className="col-sm-9">
                            <select id="inputSupplier" className="form-control" onChange={(e) => setRole(e.target.value)}  required>
                                <option defaultValue>Choose...</option>
                                {
                                    roles.map((role) => <option>{role.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={() => {props.setModal(false)}}>Close</Button>
                <input className="btn btn-info" type="submit" value="Submit Order" />
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddNewUser;