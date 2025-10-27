const myLibrary = [];

// Constructor for Book objects
function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

// Display books on the page
function displayBooks() {
  const container = document.getElementById('bookContainer');
  container.innerHTML = ''; // clear the container before re-rendering

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
      <button class="read-toggle">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    // Toggle read status
    card.querySelector('.read-toggle').addEventListener('click', () => {
      const bookObj = myLibrary.find(b => b.id === book.id);
      bookObj.toggleRead();
      displayBooks();
    });

    // Remove book
    card.querySelector('.remove-btn').addEventListener('click', () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      displayBooks();
    });

    container.appendChild(card);
  });
}

// Dialog controls
const newBookBtn = document.getElementById('newBookBtn');
const bookDialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  bookDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  bookDialog.close();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent default form submission
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('readStatus').value === 'true';

  addBookToLibrary(title, author, pages, isRead);
  bookDialog.close();
  bookForm.reset();
});

// Add some demo books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('Atomic Habits', 'James Clear', 250, false);
