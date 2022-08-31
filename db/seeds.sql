INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Admin'),
  ('Manufacturing');

INSERT INTO roles (title, salary, department_id)
VALUES
   ('Junior Sales Representative', '50000', 1),
   ('Senior Sales Representative', '80000', 1),
   ('Reception', '35000', 2),
   ('Purchaser', '50000', 2),
   ('Operator', '30000', 3),
   ('Team Leader', '40000', 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
   ('Ricky', 'Bobby', 2, NULL),
   ('Johnny', 'Bronx', 1, 1),
   ('Timmy', 'Slim', 3, NULL),
   ('Donny', 'Twos', 4, NULL),
   ('Bobby', 'Bricks', 6, NULL),
   ('Chucky', 'Cheese', 5, 5);





