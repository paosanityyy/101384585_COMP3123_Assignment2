import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpMsg, setSignUpMsg] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    try {
      const signUpResponse = await axios.post('http://localhost:3000/api/v1/user/signup', { 
        username,
        email, 
        password 
    });

      if (signUpResponse.status) {
        setSignUpMsg('Signed up successfully!');
      } else {
        setSignUpMsg('Sign up failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSignUp} className='container'>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={handleUsernameChange} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={handlePasswordChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I agree to the terms and conditions" />
      </Form.Group>

      <Button variant="primary" type="submit" className='signUpBtn'>
        Sign Up
      </Button>

      {/* Display signUpMsg based on its content */}
      {signUpMsg ? (
        <p className="text-success">{signUpMsg}</p>
      ) : (
        <p className="text-danger">{signUpMsg}</p>
      )}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </Form>
  );
}

export default Signup;