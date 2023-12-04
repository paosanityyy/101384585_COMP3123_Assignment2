import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const [addMsg, setAddMsg] = useState("");

    const onChangeFirstName = (e) => {
        setEmployee({ ...employee, first_name: e.target.value });
    }

    const onChangeLastName = (e) => {
        setEmployee({ ...employee, last_name: e.target.value });
    }

    const onChangeEmail = (e) => {
        setEmployee({ ...employee, email: e.target.value });
    }

    const addEmployee = async (e) => {
        e.preventDefault();

        const employeeData = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
        };

        try {
            await axios.post('http://localhost:3000/api/v1/emp/employees', employeeData);

            setAddMsg("Employee added successfully!");

            setEmployee({
                first_name: "",
                last_name: "",
                email: "",
            });
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <Link to ="/" className="btn btn-primary">Back</Link>
                <h1 className="m-5">Add Employee</h1>
            </div>
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={addEmployee}>
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control value={employee.first_name} type="text" placeholder="Enter first name" onChange={onChangeFirstName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control value={employee.last_name} type="text" placeholder="Enter last name" onChange={onChangeLastName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={employee.email} type="email" placeholder="Enter email" onChange={onChangeEmail} />
                            </Form.Group>

                            <Button className="btn btn-success" type="submit">
                                Add
                            </Button>
                            <Link to="/" className="btn btn-danger" >
                                Cancel
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div className="d-flex justify-content-center align-items-center">
                <p>{addMsg}</p>
            </div>
        </>
    );

}

export default AddEmployee;
