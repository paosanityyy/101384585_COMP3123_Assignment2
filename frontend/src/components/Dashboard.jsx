import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeesResponse = await axios.get('http://localhost:3000/api/v1/emp/employees');
                setEmployees(employeesResponse.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/emp/employees?eid=${id}`);
            const newEmployees = employees.filter(employee => employee._id !== id);
            setEmployees(newEmployees);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1>Employee Dashboard</h1>
            <div className='container'>
                <div className='card'>
                    <div className='card-header d-flex flex-row-reverse'>
                        <Link to="/Employee/Add" className="btn btn-primary">Add Employee</Link>
                    </div>
                    <div className='card-body'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee => (
                                    <tr key={employee._id}>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <Link to={`/Employee/Details/${employee._id}`} className="btn btn-primary">Details</Link>
                                            <Link to={`/Employee/Update/${employee._id}`} className="btn btn-warning">Edit</Link>
                                            <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;