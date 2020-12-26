const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employee
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employee
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employee
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @employee_name = ?;SET @employee_salary = ?;SET @employee_age = ?; \
    CALL emp_add_edit(@id,@employee_name,@employee_salary,@employee_age);";
    mysqlConnection.query(sql, [emp.id, emp.employee_name, emp.employee_salary, emp.employee_age], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].id);
            });
        else
            console.log(err);
    })
});

//Update an employee
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @employee_name = ?;SET @employee_salary = ?;SET @employee_age = ?; \
    CALL emp_add_edit(@id,@employee_name,@employee_salary,@employee_age);";
    mysqlConnection.query(sql, [emp.id, emp.employee_name, emp.employee_salary, emp.employee_age], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});