INSERT INTO employees (first_name, last_name, role_id, manager_id  )
VALUES ("Tim","Belcher","1",null),
        ("Dan","Parker", "2", "1"),
        ("Sally","Sitwell","3", null),
        ("Steven","Orloff","4", "3"),
        ("Barry","Blevins", "5", null),
        ("Jess","Lee", "6", null),
        ("Patrick","Dent", "7", "6");

INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", "100000", "1"),
        ("Salesperson", "80000", "1"),
        ("Lead Engineer", "150000", "2"),
        ("Software Engineer", "120000", "2"),
        ("Account Manager", "160000", "3"),
        ("Legal Team Lead", "250000", "4"),
        ("Lawyer", "190000", "4");