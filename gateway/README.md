# API Gateway & Auth Service 🔐

This repository contains the API Gateway for the flight application ecosystem. It acts as the single entry point for all client requests, providing a unified interface for the underlying microservices.

Its primary responsibilities are to manage **user authentication** using **JSON Web Tokens (JWT)** and to act as a **reverse proxy**, intelligently routing authenticated requests to the appropriate downstream service (`Flight Service` or `Flight Booking Service`). This pattern simplifies the client application, enhances security, and centralizes cross-cutting concerns.

## ✨ Features

### Core API Features
### Key Responsibilities
* **Centralized Authentication**: All requests are authenticated at the edge before they can access any internal service. It provides endpoints like `/signup` and `/login` to issue tokens.
* **Reverse Proxy & Service Routing**: Dynamically routes incoming requests to the correct microservice based on the URL path.
* **Single Point of Entry**: Simplifies the overall system architecture. Clients only need to know the URL of the Gateway, not the individual addresses of every microservice.
* **Security Layer**: Hides the internal network topology from the end user and protects the microservices from direct exposure.
---

## 📂 Project Structure

The project follows a feature-driven, layered architecture. All source code resides within the `src/` directory.
```
.
├── src
│   ├── config          # All application configurations (server, database, logger).
│   ├── controllers     # Handles incoming requests, structures API responses.
│   ├── middlewares     # Intercepts requests for validation, auth, etc.
│   ├── models          # Sequelize model definitions for database tables.
│   ├── repositories    # Data access layer; interacts directly with the database.
│   ├── routes          # API route definitions and controller mapping.
│   ├── services        # Core business logic of the application.
│   └── utils           # Helper functions, custom error classes, etc.
├── .env.example        # Example environment variables file.
├── package.json
└── ...
```

### Directory Breakdown

-   **`config`**: Contains all project configurations. For instance, `server-config.js` holds server-related settings like the port, and `config/config.js` holds Sequelize database connection details.
-   **`routes`**: Defines the API endpoints. Each route is mapped to its corresponding controllers and any necessary middlewares.
-   **`middlewares`**: These functions intercept incoming requests before they reach the controller. Ideal for tasks like request validation, user authentication, and logging.
-   **`controllers`**: Act as the entry point for a request after it passes through middlewares. They parse the request, call the appropriate service layer for business logic, and format the final `JSON` response to be sent to the client.
-   **`services`**: This is where the core business logic resides. Services orchestrate data and operations by interacting with repositories. They are completely decoupled from the web layer.
-   **`repositories`**: The only layer that communicates with the database. It encapsulates all the data access logic, whether it's raw SQL queries or ORM methods (e.g., Sequelize).
-   **`utils`**: A collection of reusable helper functions and custom error classes that can be used across the application.

---

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v18.x or higher recommended)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   A running instance of a SQL database (e.g., MySQL, PostgreSQL, MariaDB)

### 📦 Installation

1.  **Install dependencies:**
    This command installs the exact versions of dependencies listed in the `package-lock.json` file, ensuring a consistent setup.
    ```bash
    npm ci
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp envexample.txt .env
    ```
    Now, open the `.env` file and add your environment-specific configurations.

  ```env
   PORT=
   SALT_ROUNDS=15
   JWT_SECRET="secret_key"
   JWT_EXPIRIY="time"
   DATABASE_USERNAME=username
   DATABASE_PASSWORD=password
   DATABASE_URL= mysql #eg mysql postgree etc link
   FLIGHT_SERVICE=http://flight-service
   BOOKING_SERVICE=http://flight-booking
  ```

3.  **Configure the database:**
    In the `src/config/` directory, create a `config.js` file by copying the example.
    ```bash
    cp src/config/config.example.js src/config/config.js
    ```
    This file reads from your `.env` variables to configure Sequelize for different environments (development, test, production). Ensure the `dialect` (e.g., `mysql`, `postgres`) matches the database you are using.

---

## 💾 Database Management

The project uses Sequelize CLI for database migrations and seeding. These commands are aliased in `package.json` for convenience.

1.  **Create the database:**
    This command will create the database specified in your `config/config.js` and `.env` files.
    ```bash
    npm run create-db
    ```
    *(This command likely runs `npx sequelize-cli db:create`)*

2.  **Run database migrations:**
    This command will execute all pending migration files to create or update your database schema.
    ```bash
    npm run migrate-db
    ```
    *(This command likely runs `npx sequelize-cli db:migrate`)*

---

## ▶️ Running the Application

To start the server, run the following command:

```bash
npm run start