# Speed Fitness Backend

A Node.js/Express.js backend with MongoDB for the Speed Fitness application.

## Features

- User authentication (register/login)
- JWT token-based authentication
- User roles (User/Trainer)
- Password hashing with bcrypt
- Input validation
- MongoDB database integration
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (or use the existing `config.env`):
```env
MONGODB_URI=mongodb://localhost:27017/speed-fitness
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

4. Start MongoDB service (if using local MongoDB):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "userType": "user",
  "profileImage": "https://example.com/image.jpg" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "userType": "user",
      "profileImage": "https://example.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "userType": "user" // optional, validates user type
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "userType": "user",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "userType": "user",
      "email": "john@example.com",
      "phone": "+1234567890",
      "profileImage": "https://example.com/image.jpg",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### PUT `/api/auth/profile`
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "username": "new_username",
  "email": "newemail@example.com",
  "phone": "+1234567890",
  "profileImage": "https://example.com/new-image.jpg"
}
```

#### PUT `/api/auth/change-password`
Change user password (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Speed Fitness Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Database Schema

### User Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  password: String (required, min 6 chars, hashed),
  userType: String (enum: ['user', 'trainer'], default: 'user'),
  profileImage: String (optional),
  email: String (optional),
  phone: String (optional),
  isActive: Boolean (default: true),
  lastLogin: Date (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Security Features

- Password hashing using bcrypt with salt rounds of 12
- JWT tokens with 7-day expiration
- Input validation using express-validator
- CORS enabled for frontend communication
- Error handling middleware
- Authentication middleware for protected routes

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // for validation errors
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials/token)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Testing the API

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

Example curl commands:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123","userType":"user"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Frontend Integration

The frontend should:
1. Store the JWT token in localStorage after successful login/register
2. Include the token in the Authorization header for authenticated requests
3. Handle token expiration and redirect to login
4. Remove the token on logout

Example frontend usage:
```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password, userType })
});

// Authenticated request
const response = await fetch('http://localhost:5000/api/auth/profile', {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
``` 