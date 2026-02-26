# FluentAI Backend - Comprehensive Documentation

📹 Demo of the Project

Check out the full project walkthrough and usage demo here:

➡️ Demo Video — FluentAI Knowledge Sharing Platform￼
A production-ready Express.js backend for a modern AI-powered knowledge sharing and content creation platform. Features JWT authentication, MySQL database integration, AI-powered content assistance, and comprehensive error handling.

## 📋 Table of Contents

- [Approach](#approach)
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Key Design Decisions](#key-design-decisions)
- [AI Usage](#ai-usage)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)

---

## Approach

### Architecture Overview

**FluentAI Backend** follows a **layered architecture pattern** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│      Express Server & Routes         │
├─────────────────────────────────────┤
│   Controllers (HTTP Handlers)        │
├─────────────────────────────────────┤
│   Services (Business Logic)          │
├─────────────────────────────────────┤
│   Validators & Middleware            │
├─────────────────────────────────────┤
│   Models (Data Access Layer)         │
├─────────────────────────────────────┤
│   Database (MySQL)                   │
└─────────────────────────────────────┘
```

**Key Components:**

1. **Routes Layer** - Defines API endpoints and HTTP methods
2. **Controllers Layer** - Handles HTTP requests/responses, delegates to services
3. **Services Layer** - Contains business logic and application rules
4. **Validators Layer** - Input validation using Joi schemas
5. **Middleware Layer** - Authentication, error handling, CORS
6. **Models Layer** - Database queries and data access
7. **Config Layer** - Environment and database configuration

---

## Folder Structure

```
FluentAi-backend/
│
├── src/
│   ├── app.js                          # Express app configuration & setup
│   ├── server.js                       # Server entry point
│   │
│   ├── config/
│   │   ├── db.js                       # MySQL connection & initialization
│   │   └── env.js                      # Environment variable validation
│   │
│   ├── routes/
│   │   ├── index.js                    # Main route aggregator
│   │   ├── auth.routes.js              # Authentication endpoints
│   │   ├── article.routes.js           # Article CRUD endpoints
│   │   └── ai.routes.js                # AI assistance endpoints
│   │
│   ├── controllers/
│   │   ├── auth.controller.js          # Auth logic (signup, login)
│   │   ├── article.controller.js       # Article CRUD operations
│   │   └── ai.controller.js            # AI-powered features
│   │
│   ├── services/
│   │   ├── auth.service.js             # Authentication business logic
│   │   ├── article.service.js          # Article business logic
│   │   ├── ai.service.js               # AI integration & logic
│   │   └── token.service.js            # JWT token management
│   │
│   ├── models/
│   │   ├── user.model.js               # User database queries
│   │   └── article.model.js            # Article database queries
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js          # JWT verification
│   │   ├── error.middleware.js         # Global error handler
│   │   └── validate.middleware.js      # Joi schema validation
│   │
│   ├── validators/
│   │   ├── auth.validators.js          # Auth request schemas
│   │   ├── article.validators.js       # Article request schemas
│   │   └── ai.validators.js            # AI request schemas
│   │
│   └── utils/
│       └── password.js                 # Password hashing utilities
│
├── package.json                        # Dependencies & scripts
├── .env.example                        # Example environment variables
└── README.md                           # Documentation
```

---

## Key Design Decisions

### 1. **Layered Architecture**
- **Rationale**: Clear separation of concerns makes code maintainable, testable, and scalable
- **Benefit**: Easy to test individual layers independently, reduced coupling

### 2. **JWT Authentication**
- **Rationale**: Stateless authentication suitable for distributed systems
- **Benefit**: Supports frontend and mobile clients without session storage

### 3. **Joi Schema Validation**
- **Rationale**: Centralized request validation before reaching controllers
- **Benefit**: Consistent validation across all endpoints, prevents invalid data

### 4. **MySQL with Connection Pooling**
- **Rationale**: Reliable relational database with proven track record
- **Benefit**: Connection pooling improves performance under load

### 5. **AI Integration (OpenAI)**
- **Rationale**: Enhance user content with AI suggestions and improvements
- **Benefit**: Value-add feature for content creators

### 6. **CORS Configuration**
- **Rationale**: Allow frontend to communicate with backend securely
- **Benefit**: Configurable origins for development and production

### 7. **Error Handling Middleware**
- **Rationale**: Centralized error handling ensures consistent API responses
- **Benefit**: Clients receive standardized error messages

### 8. **Security Hardening**
- **Use of Helmet.js**: Protects against common web vulnerabilities
- **Use of bcrypt**: Passwords hashed with salt rounds for security
- **JWT Expiration**: Tokens expire for enhanced security

---

## AI Usage

### Tools Used
- **ChatGPT**: Code generation and API design
- **GitHub Copilot**: Accelerated coding with AI suggestions
- **Cursor IDE**: Integrated AI for rapid development

### Where AI Helped

#### ✅ Code Generation
- **Express server boilerplate** - Generated initial setup, then optimized for production
- **JWT token service** - AI generated token creation/verification logic (manually reviewed for security)
- **Database connection pool** - AI suggested mysql2/promise implementation (validated for production use)
- **CORS middleware** - AI generated configuration (adjusted for security requirements)
- **Error handling patterns** - AI generated middleware templates (customized for app needs)

#### ✅ API Design
- **RESTful endpoint structure** - AI assisted in designing consistent URL patterns
- **Error response format** - AI suggested standardized error response schema
- **Request validation schemas** - Generated Joi schema templates (validated manually)
- **HTTP status codes** - AI recommended appropriate status codes for each scenario

#### ✅ Database Queries
- **SQL for user lookups** - AI generated queries, manually optimized for performance
- **Article aggregation queries** - AI suggested JOIN logic (reviewed for correctness)
- **Pagination queries** - AI generated LIMIT/OFFSET patterns (tested with edge cases)
- **Full-text search** - AI suggested implementation (adjusted for content matching)

#### ✅ Middleware & Security
- **Auth middleware** - AI generated JWT verification logic (reviewed and enhanced)
- **Error handling** - AI suggested error middleware pattern (customized for app needs)
- **Input validation** - Joi schemas suggested by AI (manually tweaked constraints)
- **Password security** - AI generated bcrypt utilities (verified salt rounds)

#### ✅ Refactoring
- **Service layer extraction** - AI helped modularize controller logic into services
- **Utility functions** - AI generated password hashing utilities (reviewed for bcrypt best practices)
- **Code organization** - AI suggested file structure (adapted to project needs)

### What Was Reviewed/Corrected Manually

1. **Security Enhancements**
   - ✅ Configured bcrypt salt rounds to 10+
   - ✅ Set JWT expiration times (7 days access, 30 days refresh)
   - ✅ Validated CORS security settings
   - ✅ Ensured sensitive data not exposed in error messages
   - ✅ Added SQL injection protection via parameterized queries

2. **Error Handling**
   - ✅ Tested all edge cases (invalid tokens, missing fields, DB errors)
   - ✅ Ensured consistent error response format
   - ✅ Added proper HTTP status codes
   - ✅ Implemented detailed error logging

3. **Database Logic**
   - ✅ Verified SQL queries for n+1 problems
   - ✅ Tested connection pooling under load
   - ✅ Validated transaction handling
   - ✅ Added proper indexes for performance
   - ✅ Tested NULL handling and edge cases

4. **Validation Rules**
   - ✅ Adjusted Joi constraints based on business requirements
   - ✅ Tested all validation edge cases
   - ✅ Ensured appropriate error messages
   - ✅ Allowed empty content for articles (0-length support)

5. **API Contracts**
   - ✅ Reviewed endpoint responses for consistency
   - ✅ Validated request/response types
   - ✅ Tested edge cases (empty lists, null values, etc.)
   - ✅ Verified authentication requirements

---

## Setup Instructions

### Prerequisites

- **Node.js** v16+ or v18+
- **npm** or **yarn** package manager
- **MySQL** v5.7+ or v8.0+
- OpenAI API key (for AI features)

### Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fluentai_db

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_change_this
JWT_REFRESH_EXPIRE=30d

# AI Configuration (OpenAI)
OPENAI_API_KEY=sk-your_openai_api_key_here
```

### Backend Setup

#### Step 1: Install Dependencies
```bash
cd FluentAi-backend
npm install
```

#### Step 2: Create MySQL Database

```sql
-- Create database
CREATE DATABASE fluentai_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fluentai_db;

-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create articles table
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  summary TEXT,
  content LONGTEXT NOT NULL,
  category VARCHAR(100),
  tags VARCHAR(500),
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_author_id (author_id),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at),
  FULLTEXT INDEX ft_search (title, content, summary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Step 3: Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your database and API credentials
```

#### Step 4: Start Development Server
```bash
npm run dev
```

Server will start at `http://localhost:5000`

#### Step 5: Production Build
```bash
npm start
```

---

## API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "data": {
	"id": 1,
	"name": "John Doe",
	"email": "john@example.com"
  },
  "tokens": {
	"accessToken": "jwt_token_here",
	"refreshToken": "refresh_token_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "data": {
	"id": 1,
	"name": "John Doe",
	"email": "john@example.com"
  },
  "tokens": {
	"accessToken": "jwt_token_here",
	"refreshToken": "refresh_token_here"
  }
}
```

### Article Endpoints

#### Create Article
```http
POST /api/articles
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Getting Started with AI",
  "summary": "A beginner's guide to artificial intelligence",
  "content": "Artificial Intelligence is transforming industries...",
  "category": "Technology",
  "tags": "ai,technology,learning,future"
}

Response: 201 Created
{
  "message": "Article created successfully",
  "data": {
	"id": 1,
	"title": "Getting Started with AI",
	"author_id": 1,
	"created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### Get All Articles
```http
GET /api/articles?page=1&limit=10&search=ai&category=Technology
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "message": "Articles retrieved successfully",
  "data": [
	{
	  "id": 1,
	  "title": "Getting Started with AI",
	  "summary": "A beginner's guide to artificial intelligence",
	  "author_name": "John Doe",
	  "category": "Technology",
	  "created_at": "2024-01-15T10:30:00Z"
	}
  ],
  "pagination": {
	"page": 1,
	"limit": 10,
	"total": 100
  }
}
```

#### Get Single Article
```http
GET /api/articles/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "message": "Article retrieved successfully",
  "data": {
	"id": 1,
	"title": "Getting Started with AI",
	"content": "Artificial Intelligence is...",
	"author_id": 1,
	"author_name": "John Doe",
	"category": "Technology",
	"tags": "ai,technology,learning",
	"created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Article
```http
PUT /api/articles/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content here...",
  "category": "Technology"
}

Response: 200 OK
{
  "message": "Article updated successfully",
  "data": { ... }
}
```

#### Delete Article
```http
DELETE /api/articles/:id
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "message": "Article deleted successfully"
}
```

### AI Endpoints

#### AI Content Enhancement
```http
POST /api/ai/enhance
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "content": "This is my draft article text that needs improvement",
  "type": "enhancement"
}

Response: 200 OK
{
  "message": "Content enhanced successfully",
  "data": {
	"original": "This is my draft article text that needs improvement",
	"enhanced": "This draft article presents an excellent opportunity...",
	"suggestions": ["Consider adding examples", "Elaborate on the main points"]
  }
}
```

---

## Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Web application framework |
| **Database** | MySQL | Relational database |
| **Driver** | mysql2/promise | Async MySQL driver |
| **Validation** | Joi | Schema validation |
| **Authentication** | JWT | Token-based auth |
| **Passwords** | bcrypt | Password hashing |
| **Security** | Helmet.js | HTTP header security |
| **CORS** | cors | Cross-origin requests |
| **AI** | OpenAI API | Content assistance |
| **Logging** | Morgan | HTTP request logging |
| **Config** | dotenv | Environment variables |
| **Development** | nodemon | Auto-restart on changes |

---

## Error Handling

The backend uses a centralized error handling middleware that returns standardized responses:

```json
{
  "message": "Error message describing the problem",
  "details": ["Specific error detail 1", "Specific error detail 2"],
  "status": 400
}
```

**Common HTTP Status Codes:**
- `200` - Success / OK
- `201` - Created / Resource successfully created
- `400` - Bad Request / Validation error
- `401` - Unauthorized / Missing or invalid token
- `403` - Forbidden / Insufficient permissions
- `404` - Not Found / Resource doesn't exist
- `500` - Internal Server Error / Server error

---

## Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## Security Considerations

1. **JWT Secret** - Change `JWT_SECRET` in production to a strong, unique value
2. **CORS** - Whitelist only trusted origins in production
3. **Environment Variables** - Never commit `.env` file, use `.env.example` as template
4. **Password Hashing** - Always use bcrypt with salt rounds ≥ 10
5. **HTTPS** - Always use HTTPS in production
6. **Rate Limiting** - Consider adding rate limiting middleware
7. **Input Validation** - All inputs validated with Joi
8. **SQL Injection** - Protected via parameterized queries
9. **XSS Protection** - Use Helmet.js for header security
10. **CSRF** - Implement CSRF tokens if using sessions

---

## Future Enhancements

- [ ] Add pagination caching with Redis
- [ ] Implement Redis for session management
- [ ] Add webhook support for external integrations
- [ ] Implement rate limiting middleware
- [ ] Add email verification
- [ ] Add two-factor authentication
- [ ] Implement user roles & permissions
- [ ] Add article version history
- [ ] Implement full-text search optimization
- [ ] Add monitoring and analytics

---

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: 
1. Ensure MySQL is running: `brew services start mysql` (macOS) or verify Windows service
2. Check credentials in `.env` match your MySQL setup
3. Verify DB_HOST and DB_PORT are correct

### JWT Token Expired
```
Error: Token expired
```
**Solution**: 
1. Check JWT_EXPIRE setting in `.env`
2. Use refresh token endpoint to get new access token
3. Implement token refresh logic in frontend

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: 
1. Add frontend URL to `CORS_ORIGIN` in `.env`
2. Ensure backend and frontend run on correct ports
3. Check CORS headers in response

### Validation Error
```
Error: Validation error → "body.text" length must be at least 10 characters long
```
**Solution**:
1. Check validation schemas in `src/validators/`
2. Adjust Joi constraints as needed
3. Ensure request data matches expected format

---


## Support

For issues and questions, please:
1. Check this documentation
2. Review the troubleshooting section
3. Check backend logs for error details
4. Contact the development team

---
