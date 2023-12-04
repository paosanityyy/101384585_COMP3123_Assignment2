import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({loggedIn}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMsg, setLoginMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post('http://localhost:3000/api/v1/user/login', {
                username,
                password
            });

            if (loginResponse.status) {
                setLoginMsg('Logged in successfully!');
                loggedIn(loginResponse.data);
            } else {
                setLoginMsg('Login failed');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleUsernameChange = (e) => { setUsername(e.target.value); }

    const handlePasswordChange = (e) => { setPassword(e.target.value); }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Log In
            </Button>

            <p>{loginMsg}</p>

            <Form.Text>
                Don't have an account? <Link to="/signup">Sign up here!</Link>
            </Form.Text>
           
        </Form>
    );  

}

export default Login;