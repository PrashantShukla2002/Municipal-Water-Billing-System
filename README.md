# Municipal-Water-Billing-System
"Full-stack web application for municipal water billing and payment tracking using Spring Boot and React." "API server enabling retrieval, payment, and emailing of municipal water bills."
## Features

- Search water bills by bill number
- Generate payment links for bills
- Send payment reminder emails automatically
- Backend API built using Spring Boot
- Frontend developed with React

## Technologies Used

- Spring Boot 3.x (Java backend)
- PostgreSQL database
- React 18.x (Frontend UI)
- Axios for HTTP requests
- Spring Security for authentication

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.x
- Node.js and npm
- PostgreSQL database setup

### Setup Backend

1. Navigate to the backend directory:
cd waterbill-backend

text
2. Build and run:
mvn clean install
mvn spring-boot:run

text
3. Make sure PostgreSQL is running and configured in `application.properties`.

### Setup Frontend

1. Navigate to the frontend directory:
cd municipal-waterbill-frontend

text
2. Install dependencies and start:
npm install
npm start

text
3. The app runs on [http://localhost:3000](http://localhost:3000).

## Important Notes

- Backend CORS
