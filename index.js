//addBook [X]
//open form [X]
//take form answers into an object [X]
//make book card from those answers [X]

//be able to change the read status of a card [X]
//be able to delete a card []
//be able to cancel the form []

const myLibrary = [];
const libraryShelf = document.querySelector(".books");
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
  objectFromFormData.readstatus == "read" ? objectFromFormData.readStatusColor = "green" : objectFromFormData.readStatusColor = "red";

  form.reset();
  modal.close();

  libraryShelf.appendChild(drawLibrary(objectFromFormData));
});


function drawLibrary(obj) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'card');
  newDiv.setAttribute('data-card', obj.dataAttr);

  let title, author, pages, readStatus, category;
  title = obj.title;
  author = obj.author;
  pages = obj.nrofpages;
  readStatus = obj.readstatus;
  readStatusColor = obj.readStatusColor;
  category = obj.category;

  const toggleReadButton = document.createElement('button');
  toggleReadButton.setAttribute('class', 'read-toggle');
  toggleReadButton.textContent = "toggle read";
  toggleReadButton.addEventListener('click', (e) => {
    obj.readstatus == "read" ? obj.readstatus = "not read" : obj.readstatus = "read";
    obj.readstatus == "read" ? obj.readStatusColor = "green" : obj.readStatusColor = "red";
    libraryShelf.removeChild(libraryShelf.children[obj.dataAttr - 1]);
    libraryShelf.insertBefore(drawLibrary(obj), libraryShelf.childNodes[obj.dataAttr]);
  });


  const cardMarkup = `<div class="card-text"><h1 class="card-title">${title}</h1>` + 
  `<h3 class="card-author">By: ${author}</h3>` + 
  `<h3 class="card-pages">Nr. of pages: ${pages}</h3>` + 
  `<h4 class="card-category">Category: ${category}</h4>` +
  `<h4 class="card-read">Reading status: <span style="color: ${readStatusColor}">${readStatus}</span></h4></div>`;

  newDiv.innerHTML = cardMarkup;
  newDiv.appendChild(toggleReadButton);

  return newDiv
}