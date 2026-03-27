const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  return res.status(200).json({message: "Customer successfully registered"});
});

// TASK 10: Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000/");
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Error fetching books"});
  }
});

// TASK 11: Get book details based on ISBN using Promise callbacks with Axios
public_users.get('/isbn/:isbn', function (req, res) {
  axios.get(`http://localhost:5000/isbn/${req.params.isbn}`)
  .then(response => {
      return res.status(200).json(response.data);
  })
  .catch(error => {
      return res.status(404).json({message: "Book not found"});
  });
});
  
// TASK 12: Get book details based on author using async-await and Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({message: "No books found for this author"});
  }
});

// TASK 13: Get all books based on title using Promise callbacks and Axios
public_users.get('/title/:title', function (req, res) {
  axios.get(`http://localhost:5000/title/${req.params.title}`)
  .then(response => {
      return res.status(200).json(response.data);
  })
  .catch(error => {
      return res.status(404).json({message: "No books found for this title"});
  });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn]) {
      return res.status(200).json(books[isbn].reviews);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
