/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

/*
 * retrieve the required modules
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({

    /****************************************************************
     *                          columns
     ****************************************************************/

    _id: {
        type: String,
        required: true
    },

    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    email: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String
    },

    roleId: {
        type: String,
        // ref: 'Role'
    },

}, {
    timestamps: true
});

/**
 * Define indexes
 */



/*
 * Auto increament
 */


/*
 * we need to create a model using
 * the above schema
 */
var user = mongoose.model('User', userSchema);

module.exports = user;