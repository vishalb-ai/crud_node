# crud_node
Step 1
Create a database named as employeedb, in employeedb create a schema named as employee, and then create columns named as id, employee_name, employee_salary, employee_age, profile_image.

Step 2 
Run node index.js

##Then, 
##Edit information in emp.json file
##To insert use command curl -i -X POST -H "Content-Type: application/json" -d "@emp.json" http://localhost:3000/employees
##To delete use command curl -i -X DELETE http://localhost:3000/employees/:id 
##To update use command curl -i -X PUT -H "Content-Type: application/json" -d "@emp.json" http://localhost:3000/employees
##To get all employees information go to http://localhost:3000/employees/ 
##To get an individual employee information go to http://localhost:3000/employees/:id
