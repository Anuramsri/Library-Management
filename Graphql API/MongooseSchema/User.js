var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});


var user = mongoose.model('User', userSchema);

module.exports = user;