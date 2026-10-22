# 🚀 Full-Stack Todo Application

A full-stack Todo application built using **Java, Spring Boot, React.js, and TiDB Cloud** to practice REST API development, database integration, frontend-backend communication, and cloud deployment.

This project demonstrates how a React frontend communicates with a Spring Boot REST API to perform CRUD operations and persist tasks in a MySQL-compatible cloud database.

## 📌 Project Overview

The Todo application allows users to manage their tasks through a simple and user-friendly interface. It supports creating, viewing, updating, completing, and deleting tasks, along with task priority management.

The project also provides hands-on experience with Maven, Docker, Git, GitHub, environment variables, and cloud deployment.

## ✨ Features

- ✅ Create new tasks
- 📋 View the list of tasks
- ✏️ Update existing tasks
- 🗑️ Delete tasks
- ☑️ Mark tasks as completed or pending
- 🎯 Manage task priorities
- 🎨 Task cards with priority-based styling
- 🔗 REST API integration between frontend and backend
- 💾 Persistent storage using TiDB Cloud
- ⚠️ Exception handling and appropriate HTTP status codes
- 🔍 Return `404 Not Found` when a requested task does not exist

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Java 17 | Backend programming language |
| Spring Boot | Backend application and REST APIs |
| Spring Data JPA | Database access and persistence |
| Hibernate | ORM and entity management |
| React.js | Frontend UI |
| JavaScript | Frontend functionality |
| Vite | Frontend development and production builds |
| HTML5 & CSS3 | Structure and styling |
| TiDB Cloud | MySQL-compatible cloud database |
| Apache Maven | Backend build and dependency management |
| Docker | Backend containerization |
| Git & GitHub | Version control and source code hosting |
| Render | Backend cloud hosting |

## 🏗️ Application Architecture

```text
React Frontend
      |
      | HTTP Requests / JSON
      v
Spring Boot REST API
      |
      v
Spring Data JPA / Hibernate
      |
      | JDBC
      v
TiDB Cloud Database
```

The frontend sends HTTP requests to the backend. Spring Boot processes the requests, Spring Data JPA and Hibernate manage persistence, and TiDB Cloud stores the task data.

## 📂 Project Structure

```text
todo-app/
├── todo-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── Dockerfile
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── todo-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*Note: The structure above is a representative overview. The exact files and folders may vary based on the current implementation.*

## ⚙️ Prerequisites

Install the following before running the application:

- Java Development Kit (JDK) 17
- Node.js and npm
- Git
- IntelliJ IDEA or another suitable IDE
- TiDB Cloud account, or another compatible MySQL database

Docker is required if you want to build and run the backend container.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SrinuVanapalli/todo-app.git
cd todo-app
```

### 2. Configure the backend

Navigate to the backend directory:

```bash
cd todo-backend
```

Configure the following environment variables for your database connection:

| Variable | Description |
|---|---|
| `DB_URL` | JDBC URL for your database |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `PORT` | Server port; defaults to `8080` |

Example configuration in `application.properties`:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/todo_db}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
server.port=${PORT:8080}
```

Set the environment variables in your local environment or IDE run configuration. For a local MySQL setup, create the `todo_db` database first.

For TiDB Cloud, use the JDBC URL and credentials provided by your TiDB Cloud connection settings. Keep database passwords private and never commit credentials to GitHub.

### 3. Run the backend

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

Alternatively, build the executable JAR:

```powershell
.\mvnw.cmd -DskipTests package
```

The backend will normally start at:

```text
http://localhost:8080
```

### 4. Run the frontend

Open a separate terminal:

```bash
cd todo-frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal, commonly:

```text
http://localhost:5173
```

Make sure the frontend API configuration points to the running backend.

## 🔌 REST API Endpoints

The backend exposes REST endpoints for task management.

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/todos` | Retrieve all tasks |
| GET | `/api/todos/{id}` | Retrieve a task by ID |
| POST | `/api/todos` | Create a task |
| PUT | `/api/todos/{id}` | Update an existing task |
| DELETE | `/api/todos/{id}` | Delete a task |

Example request:

```http
GET /api/todos
```

Example JSON response when the task list is empty:

```json
[]
```

If a requested task ID does not exist, the backend returns `404 Not Found` with a JSON error response, for example:

```json
{
  "status": 404,
  "message": "Todo not found with id: 999999"
}
```

The exact request fields and response structure depend on the backend implementation.

## 🐳 Docker

The backend includes a Dockerfile that uses a multi-stage build to compile the Spring Boot application with Maven and run the packaged JAR using a Java 17 runtime image.

From the `todo-backend` directory, build the image:

```bash
docker build -t todo-backend .
```

Run the container with your database environment variables configured:

```bash
docker run -p 8080:8080 ^
  -e DB_URL="your-jdbc-url" ^
  -e DB_USERNAME="your-database-username" ^
  -e DB_PASSWORD="your-database-password" ^
  todo-backend
```

The command above uses Windows Command Prompt line continuations. In PowerShell, use backticks or enter the command on one line.

Replace the example database values with your own credentials. Do not include real credentials in the README or source code.

## ☁️ Cloud Deployment

### Backend — Render

The Spring Boot backend has been deployed to Render using Docker.

- Hosting platform: Render
- Runtime: Docker
- Application port: Configured through the `PORT` environment variable
- Database connection: TiDB Cloud
- Configuration: Environment variables

The Render service is currently suspended, so the deployed API is not continuously available. Resume the service before testing the cloud API.

### Database — TiDB Cloud

The application uses TiDB Cloud, a MySQL-compatible cloud database, for persistent task storage.

Database connection details are configured through environment variables rather than hard-coded credentials.

## 🧪 Testing and Troubleshooting

During development, I worked through issues involving:

- Maven builds and dependency resolution
- Spring application context initialization
- Database authentication and JDBC connectivity
- Environment variable configuration
- Hibernate dialect and database metadata
- Docker image builds
- Cloud deployment logs and service configuration

Useful troubleshooting steps include reviewing Maven output, checking Spring Boot logs, verifying database credentials, and confirming that the configured database URL and port are correct.

## 🔐 Security Notes

- Never commit database passwords, API keys, or other secrets.
- Configure credentials through environment variables.
- Use HTTPS and secure database connections in production.
- Restrict database access according to the provider's security settings.
- Avoid exposing sensitive configuration in screenshots or logs.

## 📚 Key Learnings

Through this project, I gained practical experience with:

- Building RESTful APIs using Java and Spring Boot
- Implementing CRUD operations
- Connecting React to a backend API
- Persisting data using Spring Data JPA and Hibernate
- Configuring a MySQL-compatible cloud database
- Managing dependencies and builds with Maven
- Containerizing applications using Docker
- Managing source code with Git and GitHub
- Deploying a backend and troubleshooting cloud configuration issues
- Handling missing resources and appropriate HTTP responses

## 🔮 Future Improvements

- Deploy the React frontend as a separate static website
- Configure a production frontend API URL
- Add authentication and authorization
- Add automated unit and integration tests
- Improve input validation and API documentation
- Add pagination, filtering, and search
- Introduce CI/CD for automated builds and deployments

## 👨‍💻 Author

**Srinu Vanapalli**

GitHub: [SrinuVanapalli](https://github.com/SrinuVanapalli)

Project Repository: [todo-app](https://github.com/SrinuVanapalli/todo-app)

---

⭐ If you find this project useful, feel free to explore the repository and share suggestions for improvement.

Built with Java, Spring Boot, React, and a continuous learning mindset. 🚀
