var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    publisher: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
 
}, {
    timestamps: true
});

var book = mongoose.model('Book', bookSchema);

module.exports = book;