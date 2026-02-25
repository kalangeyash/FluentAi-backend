## FluentAi Knowledge Sharing Backend

Minimal, production-ready Express.js backend for a Knowledge Sharing Platform using MySQL, JWT auth, and a clean, layered structure.

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
