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

var counterSchema = new Schema({
    /****************************************************************
     *                          columns
     ****************************************************************/
    _id: {
        type: String,
        required: true
    },

   sequence_value:{
       type:Number,
       required:true
   }

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
var counter = mongoose.model('Counter', counterSchema);

module.exports = counter;