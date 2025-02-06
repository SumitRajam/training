let bookLibrary = {
    books: [
        {
            title: "Sherlock Holmes: The Valley of Fear ()",
            author: "Sir Arthur Conan Doyle",
            yearPublished: "1915"
        },
        {
            title: "Sherlock Holmes: The Hound of the Baskervilles",
            author: "Sir Arthur Conan Doyle",
            yearPublished: "1902"
        },
    ],

    addBook(book) {
        this.books.push(book);
    },

    getBooksByAuthor(author) {
        return this.books.filter(book => book.author === author);
    },

    removeBook(title) {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.title !== title);
        return this.books.length < initialLength;
    },

    getAllBooks() {
        return this.books.map(book => book.title);
    }
}

bookLibrary.addBook({ title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960 });
bookLibrary.addBook({ title: "1984", author: "George Orwell", yearPublished: 1949 });

console.log("All Books:", bookLibrary.getAllBooks());

console.log("Books by George Orwell:", bookLibrary.getBooksByAuthor("Sir Arthur Conan Doyle"));

bookLibrary.removeBook("1984");
console.log("After Removing '1984':", bookLibrary.getAllBooks());