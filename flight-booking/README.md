# Flight-Booking Service API ✈️

This repository contains the backend service for a flight booking application. The primary purpose of this project is to demonstrate a real-world booking workflow, including a mock payment process, by leveraging **database transactions** to maintain data integrity and ensure ACID compliance.

When a user books a flight, the service initiates a transaction that locks the flight record, creates a booking, and simulates a payment. This entire operation is atomic, ensuring that data remains consistent even under concurrent requests or potential failures.

---

## ✨ Features

### Core API Features
* **Create Booking**: Initiate a new booking for a specific flight, which enters a 'pending' state.
* **Payment Simulation**: A mock payment endpoint that, upon success, confirms the booking and decrements the available seats on the flight.
* **Booking Management**: Endpoints to view booking status and details.

### Key Technical Highlight
* **Atomic Transactions (ACID)**: The core of the booking process is wrapped in a database transaction. This guarantees that the booking record creation and the update to the flight's available seats either **both succeed** or **both fail**. This prevents critical data inconsistencies, such as a seat being marked as booked without a corresponding confirmed payment record.


### Architectural Features
* **Layered Architecture**: A clear and organized structure separating business logic, data access, and API controllers.
* **ORM Integration**: Pre-configured for Sequelize to streamline database interactions.
* **Environment-Based Settings**: Uses `dotenv` for easy management of environment variables.
* **Structured Routing**: A dedicated module for defining and organizing API routes.

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
    PORT=6000
    DATABASE_USERNAME=username
    DATABASE_PASSWORD=password
    DATABASE_URL= mysql #eg mysql postgree etc link
    FLIGHT_SERVICE_URL=url of flight service
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