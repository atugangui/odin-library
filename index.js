const myLibrary = [
];

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.index = myLibrary.length;
  }

  updateRead() {
    this.read = this.read ? false : true; // Toggle book read status

    //Should probably have display logic somewhere else...
    let card = document.body.querySelector(`[data-book-index='${book.index}']`);
    let readStatus = card.querySelector(".book-read");
  
    // Switch read status
    readStatus.removeChild(readStatus.firstChild);
    readStatus.appendChild(document.createTextNode(book.read ? "Read" : "Unread"));
  
    // Switch read status button text
    let readButton = card.querySelector(".read-button");
    readButton.textContent = book.read ? "Didn't finish" : "Finished";
  }
}

function Library() {
}

Library.prototype.addBook = function(book) {
  myLibrary.push(book);
  this.displayBook(book);
}

Library.prototype.removeBook = function(book) {
  myLibrary.splice(book.index, 1);
  this.removeBookDisplay(book.index);
}

Library.prototype.displayBook = (book) => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute('data-book-index', book.index);

  // Fill card with book information
  let title = document.createElement("p");
  title.appendChild(document.createTextNode(book.title));
  title.className="book-title";
  card.appendChild(title);

  let author = document.createElement("p");
  author.appendChild(document.createTextNode(book.author));
  author.className="book-author";
  card.appendChild(author);

  let read = document.createElement("p");
  read.appendChild(document.createTextNode(book.read ? "Read" : "Unread"));
  read.className="book-read";
  card.appendChild(read);

  // Add a button to remove a book from the library
  let removeButton = document.createElement("button");
  removeButton.textContent="Remove";
  removeButton.className="remove-button";
  removeButton.addEventListener('click', (e) => {
    library.removeBookDisplay(book.index);
  })
  card.appendChild(removeButton);

  // Add a button to change the read status of the book
  let readButton = document.createElement("button");
  readButton.textContent = book.read ? "Didn't finish" : "Finished!";
  readButton.className = "read-button"
  readButton.addEventListener('click', function(e){
    book.updateRead(book);
  });
  card.appendChild(readButton);

  document.getElementById("card-container").appendChild(card);
}

Library.prototype.removeBookDisplay = (index) => {
  let cardContainer = document.getElementById("card-container");
  cardContainer.removeChild(document.body.querySelector(`[data-book-index='${index}']`));
}

const library = new Library();
const exampleBook = new Book("East of Eden", "John Steinbeck", true);
library.addBook(exampleBook);

const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  /* Grab user input */
  let title = document.querySelector("#form-title").value;
  let author = document.querySelector("#form-author").value;
  let read = document.querySelector("#form-read").checked;

  let book = new Book(title, author, read);

  library.addBook(book);

  document.querySelector("form").reset(); // Reset form
});


