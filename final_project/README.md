# Express Book Reviews

A Node.js and Express-based RESTful API for an online book shop/review platform. This project was built as part of the IBM "Node.js, Express & MongoDB" course on Coursera, demonstrating REST API design, user authentication with JWT, session management, and asynchronous programming patterns (Promises, Async-Await, and Axios).

**Repository:** [https://github.com/SandeepaGamage/expressBookReviews](https://github.com/SandeepaGamage/expressBookReviews)

## Features

- Browse a catalog of books
- Search books by ISBN, author, or title
- View and submit book reviews
- User registration and JWT-based authentication
- Session-secured routes for logged-in users to add, modify, and delete their own reviews
- Asynchronous data fetching using Promise callbacks, Async-Await, and Axios

## Tech Stack

- **Node.js** — runtime environment
- **Express.js** — web framework and routing
- **JSON Web Token (JWT)** — authentication
- **express-session** — session management
- **Axios** — HTTP client for async API calls

## Project Structure

```
expressBookReviews/
├── final_project/
│   ├── router/
│   │   ├── auth_users.js       # Registered user routes (login, reviews CRUD)
│   │   ├── general.js          # Public routes (browse books, register)
│   │   └── booksdb.js          # In-memory book data store
│   ├── index.js                # Express app entry point
│   ├── package.json
│   └── ...
├── githubrepo                  # Fork verification file (Task 14)
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/SandeepaGamage/expressBookReviews.git
cd expressBookReviews/final_project

# Install dependencies
npm install express express-session jsonwebtoken axios body-parser
```

### Running the server

```bash
node index.js
```

By default, the server runs on `http://localhost:5000`.

## API Endpoints

### Public Routes (`general.js`)

| Method | Endpoint                | Description                                  |
|--------|--------------------------|-----------------------------------------------|
| POST   | `/register`             | Register a new user                          |
| GET    | `/`                      | Get the list of all books                    |
| GET    | `/isbn/:isbn`            | Get book details by ISBN                     |
| GET    | `/author/:author`        | Get book details by author                   |
| GET    | `/title/:title`          | Get book details by title                    |
| GET    | `/review/:isbn`          | Get reviews for a specific book              |

### Authenticated Routes (`auth_users.js`)

| Method | Endpoint                        | Description                                  |
|--------|----------------------------------|-----------------------------------------------|
| POST   | `/customer/login`               | Log in a registered user                     |
| PUT    | `/customer/auth/review/:isbn`   | Add or update a review for a book            |
| DELETE | `/customer/auth/review/:isbn`   | Delete the logged-in user's review           |

> Authenticated routes require a valid JWT, issued at login and stored in the session.

## Asynchronous Implementations (Tasks 10–13)

In addition to the synchronous route handlers, `general.js` includes equivalent **Promise-based** and **Async-Await + Axios** implementations for fetching book data, demonstrating multiple approaches to asynchronous JavaScript:

- `getAllBooks()` / `getAllBooksPromise()` — fetch the full book list
- `getBookByISBN(isbn)` / `getBookByISBNPromise(isbn)` — fetch a book by ISBN
- `getBooksByAuthor(author)` / `getBooksByAuthorPromise(author)` — fetch books by author
- `getBooksByTitle(title)` / `getBooksByTitlePromise(title)` — fetch books by title

These functions call the app's own REST endpoints via Axios and can be invoked independently to demonstrate async data retrieval, e.g.:

```javascript
const general = require('./router/general.js');

general.getAllBooks();
general.getBookByISBN("1");
general.getBooksByAuthor("Chinua Achebe");
general.getBooksByTitle("Things Fall Apart");
```

## Example Usage

**Register a new user:**
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepass"}'
```

**Get all books:**
```bash
curl http://localhost:5000/
```

**Log in:**
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepass"}'
```

**Add a review (authenticated):**
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20read!" \
  -H "Cookie: session=<your_session_cookie>"
```

## Acknowledgements

This project is based on the final project template from IBM's course:  
[ibm-developer-skills-network/expressBookReviews](https://github.com/ibm-developer-skills-network/expressBookReviews)

## License

This project is for educational purposes as part of an IBM Developer Skills Network course.