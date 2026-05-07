# Student Management System

A complete, production-style full stack Student Management System built with Java 17, Spring Boot, Spring MVC, Spring Data JPA, MySQL, React, Vite, Bootstrap 5, Axios, and React Router DOM.

This project is resume-ready and beginner-friendly. The backend follows a clean layered architecture, and the frontend uses reusable components, route-based pages, API services, validation, loading states, alerts, and search.

## Folder Structure

```text
student-management-system/
|-- backend/
|   |-- pom.xml
|   `-- src/
|       |-- main/
|       |   |-- java/com/example/studentmanagement/
|       |   |   |-- config/
|       |   |   |-- controller/
|       |   |   |-- dto/
|       |   |   |-- entity/
|       |   |   |-- exception/
|       |   |   |-- repository/
|       |   |   |-- service/
|       |   |   `-- StudentManagementApplication.java
|       |   `-- resources/application.properties
|       `-- test/
|-- frontend/
|   |-- package.json
|   |-- vite.config.js
|   |-- index.html
|   `-- src/
|       |-- components/
|       |-- pages/
|       |-- services/
|       |-- App.jsx
|       |-- main.jsx
|       `-- styles.css
`-- README.md
```

## Features

- Create, read, update, and delete student records
- REST API with proper HTTP status codes
- DTO pattern for request and response models
- Validation using Jakarta Validation annotations
- Centralized exception handling
- MySQL database integration with JPA and Hibernate
- CORS configured for React on `http://localhost:5173`
- React Router pages for home, list, add, update, and details
- Axios API service layer
- Bootstrap 5 responsive UI
- Loading states, success alerts, error alerts, and search

## Tech Stack

Backend:

- Java 17
- Spring Boot 4.0.5
- Spring MVC
- Spring Data JPA
- MySQL
- Maven
- Lombok
- Validation

Frontend:

- React
- Vite
- Bootstrap 5
- Axios
- React Router DOM
- Lucide React icons

Tools:

- IntelliJ IDEA for backend
- VS Code for frontend
- MySQL Workbench
- Postman

## Spring Initializr Setup

Use these settings if you want to recreate the backend from Spring Initializr:

- Project: Maven
- Language: Java
- Spring Boot: 4.0.5
- Packaging: Jar
- Java: 17
- Dependencies: Spring Web MVC, Spring Data JPA, MySQL Driver, Lombok, Validation, Spring Boot DevTools

This repository already contains the complete Maven structure and source code, so you can open `backend/` directly in IntelliJ IDEA.

## Database Setup

Create the database in MySQL Workbench:

```sql
CREATE DATABASE student_management_system;
```

Default backend database settings are in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

Change the username and password if your local MySQL credentials are different.

The `students` table is created automatically by Hibernate because `spring.jpa.hibernate.ddl-auto=update` is enabled.

## Backend Setup in IntelliJ IDEA

1. Open IntelliJ IDEA.
2. Select `File > Open`.
3. Choose the `student-management-system/backend` folder.
4. IntelliJ will detect `pom.xml` and import it as a Maven project.
5. Wait for Maven dependency download to finish.
6. Start MySQL and confirm the database exists.
7. Open `StudentManagementApplication.java` and click Run.

You can also run the backend from a terminal inside `student-management-system/backend`:

```bash
mvn spring-boot:run
```

Maven reads `pom.xml`, downloads dependencies into your local Maven repository, and builds the application classpath automatically. The first import can take a few minutes because Maven downloads Spring Boot, Spring Data JPA, MySQL Connector/J, Lombok, Validation, and test dependencies.

Backend URL:

```text
http://localhost:8080
```

## Frontend Setup in VS Code

1. Open VS Code.
2. Open the `student-management-system/frontend` folder.
3. Install dependencies:

```bash
npm install
```

4. Start the Vite development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## API Endpoints

Base URL:

```text
http://localhost:8080/api/students
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/{id}` | Update a student |
| DELETE | `/api/students/{id}` | Delete a student |

Example POST request body:

```json
{
  "firstName": "Ananya",
  "lastName": "Rao",
  "email": "ananya.rao@example.com",
  "department": "Computer Science",
  "city": "Hyderabad"
}
```

## Postman Testing

1. Start MySQL.
2. Start the backend from IntelliJ IDEA or with `mvn spring-boot:run`.
3. Open Postman.
4. Test `POST http://localhost:8080/api/students` with the JSON body above.
5. Test `GET http://localhost:8080/api/students` to confirm the record was saved.

## Screenshots

Add screenshots here after running the application:

- Home Page: `docs/screenshots/home.png`
- Student List Page: `docs/screenshots/student-list.png`
- Add Student Page: `docs/screenshots/add-student.png`
- Student Details Page: `docs/screenshots/student-details.png`

## Deployment Guide

Backend:

- Build with `mvn clean package`.
- Deploy the generated JAR from `backend/target/`.
- Configure production database credentials with environment variables:
  - `SPRING_DATASOURCE_URL`
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`

Frontend:

- Build with `npm run build`.
- Deploy the generated `frontend/dist` folder to a static hosting service.
- Set `VITE_API_BASE_URL` before building if the backend is deployed to a different URL.

## Future Improvements

- JWT authentication and role-based access
- Backend pagination and sorting
- Server-side search filters
- Student photo upload
- Audit fields such as created date and updated date
- CI/CD pipeline with GitHub Actions
- Cloud deployment with managed MySQL
