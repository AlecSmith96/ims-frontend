import { userInfo } from 'os';
import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditUser = (props) => {
    const [users, setUsers] = useState([{}]);
    const [roles, setRoles] = useState([{}]);
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        fetch('http://localhost:9090/users/all', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
        .then(res => res.json())
        .then((data) => {setUsers(data)})
        .catch(console.error());

        fetch('http://localhost:9090/users/roles', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${localStorage.getItem('access_token')}`
            }})
        .then(res => res.json())
        .then((data) => {setRoles(data)})
        .catch(console.error());
    }, []);

    function sendUserUpdate() {
        if (window.confirm(`Are you sure you would like to update ${user.username}'s details?`)) {
            var json = `{"username": "${username}", "email": "${email}", "role":"${role}"}`;

            fetch(`http://localhost:9090/users/update-details/${user.id}`, {
                method: 'POST',
                body: json,
                headers: {
                'Authorization': `bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
                }})
            .then(res => res.json())
            .then((data) => {setRoles(data)})
            .catch(console.error());
        }
    }

    function resetPassword() {
        // send post request
        if (window.confirm(`Password for ${user.username} will be reset to 'password', continue?`)) {
            fetch(`http://localhost:9090/users/password-reset/${user.id}`, {
                method: 'POST',
                headers: {
                'Authorization': `bearer ${localStorage.getItem('access_token')}`
                }})
            .then(res => res.json())
            .then((data) => {setRoles(data)})
            .catch(console.error());
        }
    }

    function updateUser(user) {
        setUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.roles[0].name);
    }

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">Edit User Details</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => sendUserUpdate()}>
            <Modal.Body>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Select User:</label>
                        <div className="col-sm-9">
                            <select id="inputSupplier" className="form-control" onChange={(e) => {updateUser(users.find((user) => {return user.username === e.target.value}))}}  required>
                                {
                                    users.map((user) => <option>{user.username}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Username:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control mr-3 " value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3 mr-4">Email:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control mr-3 pull-right" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3">Authority:</label>
                        <div className="col-sm-9">
                            <select id="inputSupplier" className="form-control" value={role} onChange={(e) => setRole(e.target.value)}  required>
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
                <Button variant="warning" onClick={() => {resetPassword()}}>Reset Password</Button>
                <input className="btn btn-info" type="submit" value="Update Details" />
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditUser;