# Caring Pet | Pet Adoption Management System Backend

This repository contains a Pet Adoption Management System built with Node.js, Express, and TypeScript. The application uses PostgreSQL Server for database management and Prisma as the ORM. It includes authentication features and CRUD operations for managing pet adoption records. This project is developed as part of a web development course assignment from _Programming Hero Level 2_.

This repository contains the backend codebase responsible for handling server-side logic, database management, and communication between different system components.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Configuration](#configuration)
- [Usage](#usage)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code.
- **Express.js**: Web application framework for building APIs and handling HTTP requests.
- **Prisma**: ORM (Object-Relational Mapping) tool for database management.
- **PostgreSQL**: Relational database management system.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **bcrypt**: Library for hashing passwords.
- **Zod**: Library that allows developers to define schemas for their data.

## Features

- **User Authentication and Authorization**: Secure authentication using JWT tokens.
- **User Profile Creation**: Register new user profile and login.
- **Pet Management**: CRUD operations for managing pet profiles.
- **Pet Adoption Management**: Create adoptions and update adoptions status.
- **User Profile Management**: User profile details and update.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-arifuddinraihan.git
```

2. Navigate to the project directory:

```
cd l2-b2-fullstack-track-assignment-8-arifuddinraihan
```

3. Install dependencies:

```
npm install
```

## Dependencies

Before you begin, ensure you have met the following `Dependencies` requirements:

- @prisma/client
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- http-status
- jsonwebtoken
- jwt-decode
- zod

```
{
  "@prisma/client": "^5.14.0",
  "bcrypt": "^5.1.1",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "http-status": "^1.7.4",
  "jsonwebtoken": "^9.0.2",
  "jwt-decode": "^4.0.0",
  "zod": "^3.22.4"
}
```

## Development Dependencies

Before you begin, ensure you have met the following `Development Dependencies` requirements:

- @types/bcrypt
- @types/cookie-parser
- @types/cors
- @types/express
- @types/jsonwebtoken
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-config-prettier
- prettier
- prisma
- ts-node
- typescript

```
{
    "@types/bcrypt": "^5.0.2",
    "@types/cookie-parser": "^1.4.7",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20.11.30",
    "@typescript-eslint/eslint-plugin": "^7.4.0",
    "@typescript-eslint/parser": "^7.4.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.5",
    "prisma": "^5.14.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.3"
  }
```

## Configuration

Set up the environment variables by creating a `.env` file and filling in the required variables based on the provided `.env.example` file.

```
DATABASE_URL= your_mongodb_connection_string
PORT= your_preferred_port
BCRYPT_SALT_ROUNDS= your_preferred_bcrypt_salt_rounds
JWT_ACCESS_SECRET= your_preferred_jwt_access_secret
JWT_ACCESS_EXPIRES_IN= your_preferred_jwt_access_expires_in
```

Please note : If you want to add any environment variables, make sure you update the `.\src\app\config\index.ts` for the added variable

## Usage

Run the database migrations:

```
npx prisma migrate dev
```

To run the application in development mode:

```
npm run dev
```

To build the application:

```
npm run build
```

To run the application in production mode:

```
npm run start
npm run start:prod
```

## Scripts

- `npm run lint`: Run ESLint for linting.
- `npm run prettier`: Run Prettier for code formatting.
- `npm test`: Placeholder for running tests.
- `npm run build`: Build the application.
- `npm run dev`: Run the application in development mode.

## API Endpoints

- Follow file: `postman_collection.json` for POSTMAN collection to check the API endpoints. You can also visit the Vercel hosted API endpoint listed below.

```
https://as-8-pet-adoption-sql-server.vercel.app
```

### User Registration:

###### Endpoint: POST `/api/register`

- Allows users to register by providing name, email, and password.

### User Login:

##### Endpoint: POST `/api/login`

- Allows users to log in using email and password, returns JWT token upon successful login.

### Add a Pet:

##### Endpoint: POST `/api/pets`

- Requires JWT token
- Allows adding pet details like name, species, breed, etc.

### Get Paginated and Filtered Pets:

##### Endpoint: GET `/api/pets`

- Requires JWT token
- Supports query parameters for filtering by species, breed, age, size, location, and supports pagination and sorting.

### Update Pet Profile:

##### Endpoint: PUT `/api/pets/:petId`

- Requires JWT token
- Allows updating pet details.

### Submit Adoption Request:

##### Endpoint: POST `/api/adoption-request`

- Requires JWT token
- Allows users to submit an adoption request for a pet.

### Get Adoption Requests:

##### Endpoint: GET `/api/adoption-requests`

- Requires JWT token
- Retrieves all adoption requests.

### Update Adoption Request Status:

##### Endpoint: PUT `/api/adoption-requests/:requestId`

- Requires JWT token
- Allows updating the status of an adoption request.

### Get User Information:

##### Endpoint: GET `/api/profile`

- Requires JWT token
- Retrieves the user's profile information.

### Update User Information:

##### Endpoint: PUT `/api/profile`

- Requires JWT token
- Allows updating the user's profile information.

## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

- `Arif Uddin Raihan`

```
Make sure to replace placeholders like `your-username`, `your_sql_server_connection_string`, and `your_preferred_port` with your actual information. Also, update the author's name and any other details as needed.
```

```
This README file provides detailed instructions and information about the Pet Adoption Management System project, formatted appropriately for GitHub.
```
