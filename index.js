//addBook [X]
//open form [X]
//take form answers into an object [X]
//make book card from those answers []
//link book card to its respective object in the list []
//be able to change the read status of a card []
//be able to delete a card []
//be able to cancel the form []

const myLibrary = [];
const addBookButton = document.querySelector("#addBook");
const modal = document.querySelector("#modal");
addBookButton.addEventListener('click', () => {
  modal.showModal();
});

let current = 0;
function dataAttribute() {
  return current += 1;
}

//take form answers into an object and put them in the library array
const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const objectFromFormData = Object.fromEntries(formData);
  myLibrary.push(objectFromFormData);
  objectFromFormData.dataAttr = String(dataAttribute());

  console.log(myLibrary);
  console.log(`object keys: ${Object.keys(objectFromFormData)}`);
  form.reset();
  modal.close();

  drawLibrary(objectFromFormData);
});


const libraryShelf = document.querySelector(".books");
// draw the library
function drawLibrary(obj) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'card');
  newDiv.setAttribute('data-card', obj.dataAttr);

  let title, author, pages, readStatus, category;
  title = obj.title;
  author = obj.author;
  pages = obj.nrofpages;
  readStatus = obj.readstatus;
  category = obj.category;
  const cardMarkup = `<h1 id="card-title">${title}</h1>` + 
  `<h3 id="card-author">${author}</h3>` + 
  `<h3 id="card-pages">Nr. of pages: ${pages}</h3>` + 
  `<h4 id="card-read">Reading status: ${readStatus}</h4>` + 
  `<h4 id="card-category">Category: ${category}</h4>`;
  newDiv.innerHTML = cardMarkup;

  libraryShelf.appendChild(newDiv);
}