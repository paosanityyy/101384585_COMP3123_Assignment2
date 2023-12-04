import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';

const Details = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/emp/employees?eid=${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body className="d-flex justify-content-start align-items-center">
                <Link to ="/" className="btn btn-primary">Back</Link>
                <Card.Title className="m-5">Employee Details</Card.Title>
                <h1 className="m-5">Employee Details</h1>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>First Name: {employee.first_name}</ListGroup.Item>
                    <ListGroup.Item>Last Name: {employee.last_name}</ListGroup.Item>
                    <ListGroup.Item>Email: {employee.email}</ListGroup.Item>
                </ListGroup>
                <Card.Body className="d-flex justify-content-around">
                    <Link to={`/Employee/Update/${employee._id}`} className="btn btn-warning">
                        Edit
                    </Link>
                    <Link className="btn btn-danger" onClick={() => handleDelete(employee._id)} to={`/`}>
                        Delete
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
}

export default Details;

