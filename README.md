Task Manager Backend (Spring Boot + JWT)
Overview
--------------

This is a secure Task Manager backend built using Spring Boot, MySQL, and JWT Authentication.
It provides REST APIs for managing tasks with proper authentication and authorization.<br>

Each user can:<br>

Register and login<br>
Create tasks<br>
View only their own tasks<br>
Update and delete their own tasks<br>

Tech Stack
-----------------
Backend: Spring Boot<br>
Database: MySQL<br>
Authentication: JWT (JSON Web Token)<br>
Security: Spring Security<br>
ORM: Spring Data JPA (Hibernate)<br>

Features
--------------
Authentication
---------------------
User Registration<br>
User Login<br>
JWT Token Generation<br>
Secure API access using Authorization header<br>

Task Management
------------------
Create Task<br>
Get Tasks (user-specific)<br>
Update Task (only owner)<br>
Delete Task (only owner)<br>

Security
--------------
Password hashing using BCrypt<br>
JWT-based stateless authentication<br>
Authorization checks (user can only access their own tasks)<br>

Validation & Error Handling
---------------------------------
Input validation using annotations<br>
Global exception handling<br>
Proper HTTP status codes (400, 403, 404)<br>

Project Structure
------------------------
com.rishi.TaskManager<br>
│<br>
├── Controller        # Handles HTTP requests<br>
├── Service           # Business logic<br>
├── Repository        # Database operations<br>
├── Model             # Entity classes<br>
├── Config            # Security & JWT config<br>
├── Exception         # Custom exceptions & handlers<br>
├── DTO               # Data Transfer Objects<br>

Key Concepts Used
--------------------------
Layered Architecture (Controller → Service → Repository)<br>
JWT Authentication<br>
Role of Filters in Spring Security<br>
DTO Pattern for clean API responses<br>
One-to-Many relationship (User → Tasks)<br>
Exception handling with @ControllerAdvice<br>

Setup Instructions
-------------------------
Clone the repository<br>
Configure MySQL in application.properties<br>
Run the Spring Boot application<br>

Use Postman to test APIs
Notes
-----------------
Users can only access their own tasks<br>
Sensitive data like passwords are never exposed<br>
API follows RESTful principles<br>

Future Improvements
---------------------------
Add roles (Admin/User)<br>
Add pagination<br>
Add task deadlines & priorities<br>
Deploy backend to cloud<br>
