var express = require('express')
var app = express()
var bodyParser =require('body-parser')
var mongoose = require('mongoose')

app.use(bodyParser.json());

Genre = require('./models/genre')
Book = require('./models/books')

//Connect to Mongoose
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection;

app.get('/',(req,res) => {
    res.send('Please use /api/books or /api/genres ');
});

app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if (err){
            throw err
        }
        res.json({
            'genre': genres,
            'message':'Genres in the system'});
    });
   
});

app.post('/api/genres', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if (err){
            throw err
        }
        res.status(201).json({
            'genre': genre,
            'message':'Genre created successfully'});
    });
});

app.put('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if (err){
            throw err
        }
        res.json({
            'genre': genre,
            'message':'Genre editted successfully'});
    });
});

app.delete('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    Genre.deleteGenre(id, (err, genre) => {
        if (err){
            throw err
        }
        res.json({
            'genre': genre,
            'message':'Genre deleted successfully'});
    });

});

app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if (err){
            throw err
        }
        res.json({
            'book': books,
            'message':'Books in the system'});
    });
});

app.post('/api/books', (req, res) => {
    var book = req.body;
    Book.addBook(book, (err, book) => {
        if (err){
            throw err
        }
        res.status(201).json({
            'book': book,
            'message':'Book created successfully'});
    });
});

app.put('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if (err){
            throw err
        }
        res.json({
            'book': book,
            'message':'Book editted successfully'});
    });
});

app.delete('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    Book.deleteBook(id, (err, book) => {
        if (err){
            throw err
        }
        res.json({
            'book': book,
            'message':'Book deleted successfully'});
    });
});


app.listen(3002);
console.log('Running on port 3000')