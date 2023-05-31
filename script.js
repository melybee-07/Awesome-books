class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  renderBookList() {
    const bookListElement = document.getElementById('bookList');
    bookListElement.innerHTML = '';

    if (this.books.length === 0) {
      bookListElement.innerHTML = 'No books in the collection.';
      return;
    }

    const ul = document.createElement('ul');
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `"${book.title}" by ${book.author} `;

      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => this.removeBook(index));

      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    bookListElement.appendChild(ul);
  }

  addBook(title, author) {
    const newBook = { title, author };
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.renderBookList();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.renderBookList();
  }
}

const bookCollection = new BookCollection();
// Handle form submission
document.getElementById("bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    bookCollection.addBook(title, author);
    titleInput.value = "";
    authorInput.value = "";
  }
});
bookCollection.renderBookList();
