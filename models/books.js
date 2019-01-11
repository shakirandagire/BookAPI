var mongoose = require('mongoose');

//Book Schema
var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = (callback, limit) =>{
    Book.find(callback).limit(limit);
}

module.exports.addBook = (book, callback) =>{
    Book.create(book, callback);
}

module.exports.updateBook = (id, book, options, callback) =>{
    var query = {_id: id};
    var update = {
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre
    }
    Book.findOneAndUpdate(query, update, options, callback)
}

module.exports.deleteBook = (id, callback) => {
    var query = {_id: id};
    Book.remove(query, callback)
}