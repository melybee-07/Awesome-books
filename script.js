'user strict';

// Retrieve book collection from localStorage or initialize an empty array
const books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render the book list
function renderBookList() {
  const bookListElement = document.getElementById('bookList');
  bookListElement.innerHTML = '';

  if (books.length === 0) {
    bookListElement.innerHTML = 'No books in the collection.';
    return;
  }

  const ul = document.createElement('ul');
  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${book.title} <br> ${book.author} <br>`;

    // Function to remove a book from the collection
    function removeBook(index) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      renderBookList();
    }
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => removeBook(index));

    li.appendChild(removeButton);
    ul.appendChild(li);
    ul.appendChild(document.createElement('hr'));
  });

  bookListElement.appendChild(ul);
}

// Function to add a new book to the collection
function addBook(title, author) {
  const newBook = { title, author };
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  renderBookList();
}

// Handle form submission
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
});

// Initial rendering of the book list
renderBookList();
