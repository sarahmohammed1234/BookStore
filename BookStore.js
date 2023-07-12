let BOOKS = []

function getAllBooks() {
	let allBooks = []
	const keys = ['ID', 'TITLE', 'AUTHOR', 'PRICE', 'QUANTITY']
	for (let book of BOOKS) {
		let obj = {}
		for (let i = 0; i < book.length; i++) obj[keys[i]] = book[i]
		allBooks.push(obj)
	}
	console.table(allBooks, ['ID', 'TITLE', 'AUTHOR', 'PRICE', 'QUANTITY'])
}

function addBook(id, title, author, price, quantity) {
	BOOKS.push([id, title, author, price, quantity])
}

function removeBookById(id) {
	for (let book of BOOKS) {
		if (book[0] === id) BOOKS.splice(BOOKS.indexOf(book), 1)
	}
}

function editBook(bookIndex, dataType, data) {
	let book = BOOKS[bookIndex]
	if (Array.isArray(dataType)) {
		for (let i = 0; i < dataType.length; i++) {
			book[dataType[i]] = data[i]
		}
	} else book[dataType] = data
}

function findBook(value, filter) {
	for (let book of BOOKS) {
		if (book[value] === filter) return book
	}
	return "Sorry, we couldn't find your book ☹️📙"
}

function findBookById(id) {
	return findBook(0, id)
}

function findBookByTitle(title) {
	return findBook(1, title)
}

function findBookByAuthor(author) {
	return findBook(2, author)
}

function sellBook(title, quantity, balance) {
	const book = findBookByTitle(title)
	const bookIndex = BOOKS.indexOf(book)
	const price = book[3] * quantity
	if (book[4] < quantity) return "Sorry, we don't have enough copies of this book 😗📚"
	else if (price > balance) return 'Sorry, there is not enough money in your balance 😶‍🌫️💸'
	BOOKS[bookIndex][4] -= quantity
	return [{ Title: title, Author: book[2], Price: price, Quantity: quantity }]
}

// TEST APP BELOW 👇

// First we add some books
// Book contains "id, title, author, price, quantity"
addBook(10001, 'Start with why', 'Simon Sinek', 80.0, 13)
addBook(10002, 'Clean code', 'Robert Cecil Martin', 50.0, 5)

// Then let's try to retreive them
console.log('\x1b[33m%s\x1b[0m', "Books' Library")
getAllBooks()

// let's modify the 1st book's id and quantity
console.log('\x1b[33m%s\x1b[0m', "Change 1st book's ID and Quantity")
editBook(0, [0, 4], [10003, 20])
getAllBooks()

// let's modify the 2nd book's price
console.log('\x1b[33m%s\x1b[0m', "Change 2nd book's Price")
editBook(1, 3, 70.0)
getAllBooks()

// let's find the 2nd book's info by title
console.log('\x1b[33m%s\x1b[0m', "Find 2nd book's info by Title")
console.log(findBookByTitle('Clean code'))

// let's sell a couple of books to a customer
console.log('\x1b[33m%s\x1b[0m', 'Sell two copies of the 1st book to a customer')
console.table(sellBook('Start with why', 2, 200), ['Title', 'Author', 'Price', 'Quantity'])

// let's check if quantity updates
console.log('\x1b[33m%s\x1b[0m', "Books' Library")
getAllBooks()
