const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// Get all employees
router.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching employees" });
    }
});

// Create a new employee
router.post("/employees", async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        const newEmployee = new Employee({
            first_name,
            last_name,
            email
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: savedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating employee" });
    }
});

// Get employee by ID
router.get("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching employee" });
    }
});

// Update employee by ID
router.put("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid;
    try {
        const { first_name, last_name, email } = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            { first_name, last_name, email },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating employee" });
    }
});

// Delete employee by ID
router.delete("/employees", async (req, res) => {
    const employeeId = req.query.eid;
    try {
        const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            res.status(404).json({ message: "Employee not found" });
        }
        res.status(204).json({ message: "Successfully deleted employee" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting employee" });
    }
});

module.exports = router;
