import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/Styles.css';

const UpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const [updateMsg, setUpdateMsg] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employeeResponse = await axios.get(`http://localhost:3000/api/v1/emp/employees/${id}`);
                setEmployee(employeeResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEmployee();
    }, [id]);

    const onChangeFirstName = (e) => {
        setEmployee({ ...employee, first_name: e.target.value });
    };

    const onChangeLastName = (e) => {
        setEmployee({ ...employee, last_name: e.target.value });
    };

    const onChangeEmail = (e) => {
        setEmployee({ ...employee, email: e.target.value });
    };

    const updateEmployee = async (e) => {
        e.preventDefault();

        const employeeData = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
        };

        try {
            await axios.put(`http://localhost:3000/api/v1/emp/employees/${id}`, employeeData);

            setUpdateMsg('Employee updated successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <Link to="/" className="btn btn-primary">Back</Link>
                <h1 className="m-5">Update Employee</h1>
            </div>
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={updateEmployee}>
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" value={employee.first_name} onChange={onChangeFirstName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" value={employee.last_name} onChange={onChangeLastName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={employee.email} onChange={onChangeEmail} />
                            </Form.Group>

                            <Button className="btn btn-secondary" variant="primary" type="submit">
                                Update
                            </Button>
                            <Button className="btn btn-danger">
                            <Link to="/" >
                                Cancel
                            </Link>
                            </Button>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div>
                {updateMsg ? (
                    <p className="text-success">{updateMsg}</p>
                ) : (
                    <p className="text-danger">{updateMsg}</p>
                )}
            </div>
        </>
    )
}

export default UpdateEmployee;