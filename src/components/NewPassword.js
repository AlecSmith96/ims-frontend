import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';

const NewPassword = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit() {
        const username = localStorage.getItem('user_name');

        fetch(`http://localhost:9090/users/password-change/${username}`, {
                method: 'POST',
                body: `${newPassword}`,
                headers: {
                'Authorization': `bearer ${localStorage.getItem('access_token')}`
                }})
            .then(res => res.json())
            .catch(console.error());
    }

    return (
        <Modal show={props.showModal} onHide={() => props.setModal(false)}>
            <Modal.Header className="bg-light" closeButton>
                <Modal.Title className="">Enter your new password below.</Modal.Title>
            </Modal.Header>

            <form onSubmit={() => handleSubmit()}>
            <Modal.Body>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3 mr-4">New Password:</label>
                        <div className="">
                            <input type="password" className="form-control mr-3 float-right" onChange={(e) => setNewPassword(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputSupplier" className="col-form-label ml-3 mr-4">Confirm New Password:</label>
                        <div className="">
                            <input type="password" className="form-control mr-3 pull-right" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="text-danger">{newPassword === confirmPassword ? '' : 'Passwords do not match.'}</div>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={() => {props.setModal(false)}}>Close</Button>
                {
                    newPassword === confirmPassword ? 
                    <input className="btn btn-info" type="submit" value="Update Password" /> :
                    <input className="btn btn-info" type="submit" value="Update Password" disabled/>
                }
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default NewPassword;