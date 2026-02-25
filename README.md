## FluentAi Knowledge Sharing Backend

Minimal, production-ready Express.js backend for a Knowledge Sharing Platform using MySQL, JWT auth, and a clean, layered structure.

Here is your content formatted cleanly in proper Markdown for README:

⸻

Knowledge Sharing Platform – Backend

This project is a Node.js + Express backend for a Knowledge Sharing Platform, using:
	•	MySQL (mysql2/promise) for persistence
	•	JWT for authentication
	•	dotenv for environment configuration
	•	Centralized error handling and validation
	•	Clean layered structure: config, controllers, routes, middleware, services, models, utils, validators

⸻

Project Structure

package.json
README.md
.env / .env.example
src/
  ├── server.js
  ├── app.js
  ├── config/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── services/
  ├── utils/
  └── validators/


⸻

package.json

Scripts
	•	npm run dev – Start server with nodemon (NODE_ENV=development)
	•	npm start – Start server in production (NODE_ENV=production)
	•	npm run lint – Run ESLint on src

Main Dependencies
	•	express
	•	mysql2
	•	jsonwebtoken
	•	bcrypt
	•	dotenv
	•	helmet
	•	cors
	•	joi
	•	morgan
	•	openai

⸻

Environment Configuration

Server
	•	NODE_ENV
	•	PORT

Database
	•	DB_HOST
	•	DB_PORT
	•	DB_USER
	•	DB_PASSWORD
	•	DB_NAME

JWT
	•	JWT_SECRET
	•	JWT_EXPIRES_IN

OpenAI
	•	OPENAI_API_KEY

⸻

Runtime Entry Points

src/server.js
	•	Creates HTTP server
	•	Loads app from createApp()
	•	Listens on configured PORT
	•	Catches startup errors and exits if initialization fails

src/app.js

Responsible for:
	•	Security middleware: helmet, cors
	•	JSON body parsing: express.json()
	•	Logging in development: morgan('dev')
	•	Registering all routes under /api
	•	notFoundHandler for unmatched routes
	•	errorHandler for centralized errors
	•	Ensures initDb() runs before handling requests

⸻

Configuration Layer (src/config)

env.js
	•	Loads .env using dotenv
	•	Exposes centralized config object:
	•	nodeEnv, port
	•	db: { host, port, user, password, database }
	•	jwt: { secret, expiresIn }
	•	openai: { apiKey }

db.js
	•	Creates MySQL connection pool using mysql2/promise
	•	initDb():
	•	Creates pool
	•	Runs SELECT 1 connectivity check
	•	getDb():
	•	Returns pool
	•	Throws error if DB not initialized

⸻

Middleware (src/middleware)

auth.middleware.js
	•	Reads Authorization: Bearer <token>
	•	Verifies JWT
	•	Attaches req.user = { id, email }
	•	Returns 401 if invalid or missing token

validate.middleware.js
	•	Accepts Joi schema (body, params, query)
	•	On validation error:
	•	Returns 400
	•	Message: Validation error
	•	Includes details
	•	On success:
	•	Replaces request values with sanitized data

error.middleware.js

notFoundHandler
	•	Handles unmatched routes → 404

errorHandler
	•	Central error handler
	•	Uses err.statusCode or defaults to 500
	•	Returns:

{ message, stack?, details? }


	•	Stack shown only in development

⸻

Models (src/models)

user.model.js

Functions:
	•	createUser({ name, email, passwordHash })
	•	findUserByEmail(email)
	•	findUserById(id)

article.model.js

Functions:
	•	listArticles({ search, category, limit, offset })
	•	Dynamic WHERE
	•	Parameterized LIKE queries
	•	Returns { items, total }
	•	getArticleById(id)
	•	createArticle(...)
	•	updateArticle(...)
	•	deleteArticle(id)

⸻

Services (src/services)

auth.service.js

register()
	•	Check existing email
	•	Hash password
	•	Create user
	•	Generate JWT
	•	Return { user, token }

login()
	•	Verify credentials
	•	Return { user, token }
	•	401 on invalid login

⸻

article.service.js

Business Logic + Authorization
	•	list() → pagination + filters
	•	getById() → 404 if not found
	•	create()
	•	update():
	•	404 if not found
	•	403 if not author
	•	remove():
	•	404 if not found
	•	403 if not author

⸻

token.service.js
	•	generateToken(user)
	•	verifyToken(token)

⸻

ai.service.js

Uses OpenAI SDK (API key from environment)

Functions:
	•	improveContent(text)
	•	generateSummary(text)
	•	suggestTags(text)

If API key missing → 500 error.

⸻

Controllers (src/controllers)

auth.controller.js
	•	register → 201 { user, token }
	•	login → { user, token }

article.controller.js
	•	list → { items, total, page, limit }
	•	getById
	•	create (auth required)
	•	update (author only)
	•	remove → 204

ai.controller.js
	•	POST /ai/improve → { improved }
	•	POST /ai/summary → { summary }
	•	POST /ai/tags → { tags }

All controllers use centralized error handling.

⸻

Validators (src/validators)
	•	auth.validators.js
	•	article.validators.js
	•	ai.validators.js

Using Joi for:
	•	Request body validation
	•	Query validation
	•	Parameter validation

⸻

Routes (src/routes)

All routes mounted under /api

Auth

POST /api/auth/register
POST /api/auth/login

Articles

GET    /api/articles
GET    /api/articles/:id
POST   /api/articles
PUT    /api/articles/:id
DELETE /api/articles/:id

AI

POST /api/ai/improve
POST /api/ai/summary
POST /api/ai/tags


⸻

Utilities (src/utils)

password.js
	•	hashPassword(plain)
	•	comparePassword(plain, hash)
	•	Uses SALT_ROUNDS = 10

⸻

Database Schema

users
	•	id (PK)
	•	username (indexed)
	•	email (unique)
	•	password_hash
	•	created_at

Indexes:
	•	uq_users_email
	•	idx_users_username
	•	idx_users_created_at

⸻

articles
	•	id (PK)
	•	title
	•	summary
	•	content (LONGTEXT)
	•	category (indexed)
	•	tags
	•	author_id (FK → users.id)
	•	created_at
	•	updated_at

Indexes:
	•	idx_articles_category
	•	idx_articles_author_id
	•	idx_articles_created_at
	•	FULLTEXT ft_articles_search

⸻

Typical Flows

Authentication

POST /api/auth/register
POST /api/auth/login

→ Validate
→ Service
→ DB
→ JWT

⸻

Secure Article CRUD
	•	JWT in Authorization header
	•	Middleware sets req.user
	•	Services enforce author-only update/delete

⸻

Search & Filter

GET /api/articles?search=react&category=AI&page=2&limit=20

	•	Safe parameterized queries
	•	Pagination supported

⸻

AI Enhancements

POST /api/ai/improve
POST /api/ai/summary
POST /api/ai/tags

Returns minimal structured JSON:

{ "improved": "..." }
{ "summary": "..." }
{ "tags": "react, backend, ai" }


⸻

### Folder structure

- `src/config` – environment + database config
- `src/controllers` – HTTP controllers (thin, call services)
- `src/routes` – Express route definitions
- `src/middleware` – auth, validation, error handling
- `src/services` – business logic (auth, articles)
- `src/models` – MySQL data-access (using `mysql2/promise`)
- `src/utils` – small reusable helpers (e.g. password hashing)
- `src/validators` – Joi validation schemas

### Getting started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from the example and adjust values:

```bash
cp .env.example .env
```

3. Create MySQL schema and tables:

```sql
CREATE DATABASE fluentai_knowledge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE fluentai_knowledge;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_users_email UNIQUE (email),
  INDEX idx_users_username (username),
  INDEX idx_users_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE articles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  summary VARCHAR(500) DEFAULT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) DEFAULT NULL,
  tags VARCHAR(500) DEFAULT NULL,
  author_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_articles_users FOREIGN KEY (author_id) REFERENCES users(id),
  INDEX idx_articles_category (category),
  INDEX idx_articles_author_id (author_id),
  INDEX idx_articles_created_at (created_at),
  FULLTEXT INDEX ft_articles_search (title, summary, content, tags)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

4. Run the server:

```bash
npm run dev
```

### Core endpoints (summary)

- `POST /api/auth/register` – register user, returns JWT
- `POST /api/auth/login` – login user, returns JWT
- `GET /api/articles` – list articles (supports `search`, `category`, `page`, `limit`)
- `GET /api/articles/:id` – get single article
- `POST /api/articles` – create article (requires `Authorization: Bearer <token>`)
- `PUT /api/articles/:id` – update article (author only)
- `DELETE /api/articles/:id` – delete article (author only)
- `POST /api/ai/improve` – improve article content (auth required)
- `POST /api/ai/summary` – generate summary (auth required)
- `POST /api/ai/tags` – suggest tags (auth required)
