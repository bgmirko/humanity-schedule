React Application: Humanity Schedule
author: Mirko Martinovic
date: 24/3/2019.
GitHub repository: https://github.com/bgmirko/humanity-schedule


Installation instructions
1. git clone https://github.com/bgmirko/humanity-schedule.git
2. npm install
3. npm start

Description:
- Application use Firebase Api for Back-end. There is no need for additional connection settings.
- Redux for handling state
- Axios for RESTful requests
- Thunk for middleware
- React Router 

Main Components
- EmployeesContorler
- ScheduleControler
- ShiftsControler

Operations for Employees: create new, edit, delete.
Operations for Shifts: create new, delete, add more employees for an existing shift or remove employees from the shift
Job positions are predefined, it's possible to select a job position for an employee when create or edit employee.
Every job positions have a unique color.
The schedule shows one week period. Highlight today date. It's possible to switch table forward or backward to new weeks.
For backward switching application tests and not allow to go in past time with disabling backward button.
The application has form validation

 



