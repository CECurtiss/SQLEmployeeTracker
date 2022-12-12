 SELECT
    employees.id AS 'Employee ID',
    employees.first_name AS "First Name",
    employees.last_name AS "Last Name",
    roles.title AS "Job Title",
    departments.name AS "Department",
    roles.salary AS "Salary",
    employees.manager_id AS "Manager"
    FROM employees
    LEFT JOIN roles
        ON roles.id = employees.role_id
    LEFT JOIN departments
        ON departments.id = roles.department_id



