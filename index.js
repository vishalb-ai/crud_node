const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeedb',
    multipleStatements: true
});

// Get all employees
app.get('/employees', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from Employee', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from employee table are: \n', rows)
        })
    })
})

// Get an employee
app.get('/employees/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM Employee WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from employee table are: \n', rows)
        })
    })
});

// Delete a employee
app.delete('/employees/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM Employee WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Employee with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from employee table are: \n', rows)
        })
    })
});

// Add employee
app.post('/employees', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO Employee SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Employee has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from employee table are: \n', rows)

        })
    })
});

//Update employee
app.put('/employees', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, employee_name, employee_salary, employee_age, profile_image } = req.body

        connection.query('UPDATE Employee SET employee_name = ?, employee_salary = ?, employee_age = ?, profile_image = ? WHERE id = ?', [employee_name, employee_salary, employee_age, profile_image, id] , (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`Employee with the name: ${employee_name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

// Listen on enviroment port or 3000
app.listen(3000, () => console.log('Express server is running at port no : 3000'));
