const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BASE_URL = "http://localhost:5000";


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists in the users array
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Username already exists!" });
  }

  // Register the user
  users.push({ "username": username, "password": password });
  return res.status(201).json({ message: "User successfully registered. Now you can login" });
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Using JSON.stringify with null and 4 spaces to format the output cleanly
  return res.status(200).send(JSON.stringify(books, null, 4));
});


public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});
  

public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books); // Get all keys (ISBNs) of the books object
  let filtered_books = [];

  // Iterate through the books object to find matching authors
  keys.forEach(key => {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      filtered_books.push({ isbn: key, ...books[key] });
    }
  });

  if (filtered_books.length > 0) {
    return res.status(200).send(JSON.stringify(filtered_books, null, 4));
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});


public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books);
  let filtered_books = [];

  // Iterate through the books object to find matching titles
  keys.forEach(key => {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      filtered_books.push({ isbn: key, ...books[key] });
    }
  });

  if (filtered_books.length > 0) {
    return res.status(200).send(JSON.stringify(filtered_books, null, 4));
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});


public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).send(JSON.stringify(book.reviews, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("Task 10 - All books:", response.data);
    return response.data;
  } catch (error) {
    console.error("Task 10 - Error fetching books:", error.message);
    throw error;
  }
}

// Equivalent version using Promise callbacks (.then/.catch) instead of async-await
function getAllBooksPromise() {
  return axios.get(`${BASE_URL}/`)
    .then(response => {
      console.log("Task 10 (Promise) - All books:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Task 10 (Promise) - Error fetching books:", error.message);
      throw error;
    });
}


async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(`Task 11 - Book with ISBN ${isbn}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Task 11 - Error fetching book with ISBN ${isbn}:`, error.message);
    throw error;
  }
}

// Equivalent version using Promise callbacks
function getBookByISBNPromise(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log(`Task 11 (Promise) - Book with ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch(error => {
      console.error(`Task 11 (Promise) - Error fetching book with ISBN ${isbn}:`, error.message);
      throw error;
    });
}


async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log(`Task 12 - Books by author ${author}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Task 12 - Error fetching books by author ${author}:`, error.message);
    throw error;
  }
}

// Equivalent version using Promise callbacks
function getBooksByAuthorPromise(author) {
  return axios.get(`${BASE_URL}/author/${author}`)
    .then(response => {
      console.log(`Task 12 (Promise) - Books by author ${author}:`, response.data);
      return response.data;
    })
    .catch(error => {
      console.error(`Task 12 (Promise) - Error fetching books by author ${author}:`, error.message);
      throw error;
    });
}


async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(`Task 13 - Books with title ${title}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Task 13 - Error fetching books with title ${title}:`, error.message);
    throw error;
  }
}

// Equivalent version using Promise callbacks
function getBooksByTitlePromise(title) {
  return axios.get(`${BASE_URL}/title/${title}`)
    .then(response => {
      console.log(`Task 13 (Promise) - Books with title ${title}:`, response.data);
      return response.data;
    })
    .catch(error => {
      console.error(`Task 13 (Promise) - Error fetching books with title ${title}:`, error.message);
      throw error;
    });
}

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getAllBooksPromise = getAllBooksPromise;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBookByISBNPromise = getBookByISBNPromise;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByAuthorPromise = getBooksByAuthorPromise;
module.exports.getBooksByTitle = getBooksByTitle;
module.exports.getBooksByTitlePromise = getBooksByTitlePromise;