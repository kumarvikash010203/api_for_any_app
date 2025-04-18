# Signup API

A complete signup API with all necessary features for user registration, login, and profile management. Uses SQL Server for data storage.

## Features

- Complete user registration API
- SQL Server database integration (works with Azure Data Studio)
- Secure password hashing (bcrypt)
- Profile picture upload
- Data validation (Joi)
- Multi-role support (admin, user, vendor)

## Setup Instructions

### Requirements

- Node.js
- SQL Server (can use LocalDB, Express, Developer or Azure SQL)
- Azure Data Studio or SQL Server Management Studio

### Installation

1. Clone or download the repository

2. Install dependencies:
```bash
npm install
```

3. Create a SQL Server database named `signup_db`:
   - Using Azure Data Studio, connect to your SQL Server
   - Run the query: `CREATE DATABASE signup_db;`

4. Update the .env file with your SQL Server details:
```
PORT=5000
DB_USER=sa
DB_PASSWORD=YourStrongPassword
DB_SERVER=localhost
DB_NAME=signup_db
DB_ENCRYPT=false
DB_TRUST_SERVER_CERT=true
```

5. Start the server:
```bash
npm run dev
```

## Connecting with Azure Data Studio

1. Open Azure Data Studio
2. Click "New Connection"
3. Enter your SQL Server details:
   - Server: localhost (or your SQL Server address)
   - Authentication type: SQL Login
   - User name: sa (or your SQL username)
   - Password: YourStrongPassword (or your SQL password)
   - Database: signup_db
4. Click "Connect"

You should now be able to see the `users` table in the database, where all signup data will be stored.

## API Endpoints

### Signup
```
POST /api/users/signup
```

#### Request Format
```json
{
  "fullName": "Vikash Kumar Sharma",
  "email": "vikash@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phoneNumber": "9876543210",
  "username": "vikash_sharma",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "address": "123 Main Street, Delhi",
  "referralCode": "REF123",
  "userRole": "user"
}
```

#### Response
```json
{
  "success": true,
  "message": "Signup successful!",
  "userId": 1
}
```

### Login
```
POST /api/users/login
```

#### Request Format
```json
{
  "email": "vikash@example.com",
  "password": "password123"
}
```

#### Response
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "fullName": "Vikash Kumar Sharma",
    "email": "vikash@example.com",
    "role": "user"
  }
}
```

### Get Profile
```
GET /api/users/profile/:id
```

#### Response
```json
{
  "success": true,
  "user": {
    "id": 1,
    "fullName": "Vikash Kumar Sharma",
    "email": "vikash@example.com",
    "phoneNumber": "9876543210",
    "username": "vikash_sharma",
    "profilePicture": "uploads/profile-123456789.jpg",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "address": "123 Main Street, Delhi",
    "userRole": "user",
    "createdAt": "2023-06-01T12:00:00.000Z"
  }
}
``` "# api_for_any_app" 
