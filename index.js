const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // To accept JSON in requests

// Sample books array
let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    books[index] = { id: bookId, ...updatedBook };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.json({ message: "Book deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
