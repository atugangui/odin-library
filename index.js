class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }

  get index() {
    return this._index;
  }
  
  set index(index) {
    this._index = index;
  }

  updateRead() {
    this.read = this.read ? false : true; // Toggle book read status

    //Should probably have display logic somewhere else...
    let card = document.body.querySelector(`[data-book-index='${this.index}']`);
    let readStatus = card.querySelector(".book-read");
  
    // Switch read status
    readStatus.removeChild(readStatus.firstChild);
    readStatus.appendChild(document.createTextNode(this.read ? "Read" : "Unread"));
  
    // Switch read status button text
    let readButton = card.querySelector(".read-button");
    readButton.textContent = this.read ? "Didn't finish" : "Finished";
  }
}

class Library {
  constructor(){
    this.collection = [];
  }
  
  addBook(book) {
    this.collection.push(book);
    book.index = this.collection.length;
    this.displayBook(book);
  }

  displayBook(book){
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
    removeButton.addEventListener('click', () =>{
      this.removeBookDisplay(book);
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

  removeBook(book) {
    this.collection.splice(book.index, 1);
    this.removeBookDisplay(book);
  }

  removeBookDisplay = (book) => {
    let cardContainer = document.getElementById("card-container");
    cardContainer.removeChild(document.body.querySelector(`[data-book-index='${book.index}']`));
  }
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


