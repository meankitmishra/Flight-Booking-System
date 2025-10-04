# Flight Application Microservices ✈️

This repository contains the complete backend infrastructure for a flight application, architected as a distributed system of microservices. The entire stack, including all services and their databases, is containerized and can be managed with a single command using **Docker Compose**.

---

## 🏛️ System Architecture

The system is composed of three core services that communicate over a Docker network. An **API Gateway** serves as the single entry point for all client traffic, handling authentication and routing requests to the appropriate downstream service.

```text
                                                              +---------------------+
                               +----------------------------->|   Flight Service    |
                               | (e.g., /api/v1/flights)      |  (Port: 3000)       |
                               |                              | (Database: flights_db)|
                               |                              +---------------------+
                               |
+-----------+      +-------------------------+
|           |      |      API Gateway        |
|  Client   |----->| (Port: 8080)            |
|           |      | (Handles Auth & Routes) |
+-----------+      +-------------------------+
                               |
                               |                              +---------------------+
                               |                              |  Booking Service    |
                               +----------------------------->|  (Port: 3001)       |
                                 (e.g., /api/v1/bookings)     | (Database: bookings_db)|
                                                              +---------------------+
```

---

## 🚀 Services Overview

This repository contains the following services:

1.  **`/api-gateway`**: The single entry point for all incoming requests. It is responsible for **user authentication** using JWT and **routing** traffic to the appropriate microservice.
2.  **`/flight-service`**: A microservice that manages all core flight data. It provides **CRUD** endpoints for flights, airplanes, airports, and cities.
3.  **`/booking-service`**: A microservice that handles the flight booking workflow. It demonstrates the use of **database transactions** to ensure data integrity during the mock payment and booking confirmation process.

---

## 🛠️ Technology Stack

* **Backend**: Node.js, Express.js
* **Database**: MySQL 
* **ORM**: Sequelize
* **Authentication**: JSON Web Tokens (JWT)
* **Containerization**: Docker, Docker Compose

---

## 🐳 Getting Started with Docker

The only prerequisites you need to run this entire microservices stack are **Git**, **Docker**, and **Docker Compose**.

### 1. Clone the Repository

Clone this root repository to your local machine.

```bash
git clone [https://github.com/your-username/flight-microservices.git](https://github.com/your-username/flight-microservices.git)
cd flight-microservices
```

### 2. Configure Environment Variables 
You must create a .env file inside each of the three service directories (api-gateway, flight-service, booking-service). You can do this by copying the .env.example files.

#### Required File Structure:
```
.
├── api-gateway/
│   ├── src/config/
        ├──congig.example.js
        ├──config.js <-- CREATE THIS FILE
│   ├── .env.example
│   └── .env        <-- CREATE THIS FILE
├── flight-service/
│   ├── src/config/
        ├──congig.example.js
        ├──config.js <-- CREATE THIS FILE
│   ├── .env.example
│   └── .env        <-- CREATE THIS FILE
├── booking-service/
│   ├── src/config/
        ├──congig.example.js
        ├──config.js <-- CREATE THIS FILE
│   ├── .env.example
│   └── .env        <-- CREATE THIS FILE
└── docker-compose.yml
```

Important Configuration Note:
When running with Docker Compose, services communicate using their service names as hostnames. Update the .env file in api-gateway to use the service names defined in docker-compose.yml.

File: `api-gateway/.env`

Code snippet

```PORT=8080
JWT_SECRET=this_is_a_very_strong_secret_key
# Use Docker service names instead of 'localhost'
FLIGHT_SERVICE_URL=http://flight-service:3000
BOOKING_SERVICE_URL=http://booking-service:3001
```

Configure the `.env` files for the other two services with your desired database credentials. These will be used by `docker-compose.yml` to initialize the databases.

### 3. Build and Run the Stack
Once the .env files are configured, you can build the container images and start all the services with a single command from the root directory.

```Bash
docker-compose up --build
```
The --build flag tells Docker Compose to build the images from the Dockerfiles the first time you run it. Your entire microservices backend is now up and running!

### ▶️ Usage
Start services: docker-compose up (or docker-compose up -d to run in detached mode).

Stop services:
```Bash
docker compose down
```

View logs: docker-compose logs -f <service_name> (e.g., docker-compose logs -f api-gateway).

All API requests should now be sent to the API Gateway at http://localhost:6003.