//Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Constructort
function UI() {}
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
//Create tr element
    const row = document.createElement('tr');
//Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}
//Show allert 
UI.prototype.showAlert = function(message, className){
    //Create Div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    //Add text 
    div.appendChild(document.createTextNode(message));
//Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
//Insert alert
    container.insertBefore(div, form);
    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);


}
//CLEAR FIELDS
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//ADD event listener

document.getElementById('book-form').addEventListener('submit',function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    //Instatiate of book
    const book = new Book(title, author, isbn);

    //Instatiate of UI
    const ui = new UI();
    //Validate

    if(title === '' || author === '' || isbn === ''){
       ui.showAlert('Please fill in all fields', 'error');
    }
    else {
        ui.addBookToList(book);
        //Show success
        ui.showAlert('Book added!', 'success'); 

        ui.clearFields();
    }
    
    e.preventDefault(); 
});

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Deleted!', 'success');
    e.preventDefault();
})