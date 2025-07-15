let addBook = document.querySelector(".addBook");
let formOverlay = document.querySelector(".overlay");
let form = document.querySelector("form");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pagesNum = document.querySelector("#pages");
let readCheck = document.querySelector("#have-read");

// Show And Hidden Book Form
addBook.addEventListener("click", (e) => {
	formOverlay.classList.remove("hidden");
});

formOverlay.addEventListener("click", (e) => {
	formOverlay.classList.add("hidden");
});

form.addEventListener("click", (e) => {
	e.stopPropagation();
});

let booksArr = [];
if (localStorage.getItem("books")) {
	booksArr = JSON.parse(localStorage.getItem("books"));
	// Display Books
	displayBooks();
	// Toggle Read Status
	toggleReadStatus();
	// Remove Book
	removeBook();
}

let submitBook = document.querySelector("#submit");

// When Clicked On Submit Button
submitBook.addEventListener("click", (e) => {
	e.preventDefault();
	// Collect Book Data
	if (title.value === "" || author.value === "" || pagesNum.value === "") {
		alert("Fields cannot be empty");
	} else {
		let bookData = {
			title: title.value,
			author: document.querySelector("#author").value,
			pages: pagesNum.value,
			checkRead: readCheck.checked,
		};
		booksArr.push(bookData);
		localStorage.setItem("books", JSON.stringify(booksArr));
	}

	// Reset Book Form Inputs
	title.value = "";
	author.value = "";
	pagesNum.value = "";
	readCheck.checked = false;

	// Clear Previous Books
	document.querySelector(".books").innerHTML = "";

	// Create Book Div In Page
	displayBooks();

	// Toggle Read Status
	toggleReadStatus();

	// Remove Book
	removeBook();
});

function displayBooks() {
	booksArr.forEach((book) => {
		let bookStatus = book.checkRead ? "isRead" : "notRead";
		let bookStatusText = book.checkRead ? "Read" : "Not Read";
		let bookDiv = `
        <div class="book">
					<h4 class="bookName">${book.title}</h4>
					<p class="author">${book.author}</p>
					<span class="pages">${book.pages} Pages</span>
					<div class="status">
						<span class="read ${bookStatus}">${bookStatusText}</span>
						<button class="remove">Remove</button>
					</div>
				</div>
      `;
		document.querySelector(".books").innerHTML += bookDiv;
	});
}

function toggleReadStatus() {
	let readBtns = document.querySelectorAll(".read");
	readBtns.forEach((btn, index) => {
		btn.addEventListener("click", (e) => {
			booksArr[index].checkRead = !booksArr[index].checkRead;
			localStorage.setItem("books", JSON.stringify(booksArr));
			if (btn.classList.contains("isRead")) {
				btn.classList.replace("isRead", "notRead");
				btn.textContent = "Not Read";
			} else {
				btn.classList.replace("notRead", "isRead");
				btn.textContent = "Read";
			}
		});
	});
}

function removeBook() {
	let removeBtns = document.querySelectorAll(".remove");
	removeBtns.forEach((btn, index) => {
		btn.addEventListener("click", (e) => {
			booksArr.splice(index, 1);
			localStorage.setItem("books", JSON.stringify(booksArr));
			document.querySelector(".books").innerHTML = "";
			displayBooks();
			removeBook();
      toggleReadStatus();
		});
	});
}