/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

'use strict';

/**
 *  Import DTO 
 */

const counter = require('../dto/counter');

/* Auto Increament _id*/

let getNextValue= async function(sequence){
    return new Promise(async function (resolve, reject) {
        try {
        var query = {
            $inc:{sequence_value:1}
        };
        counter.findOneAndUpdate({
           _id:sequence
        },
           query,
           {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }
        ,function(err,doc){
            resolve(doc.sequence_value.toString());
        })
        }
        catch(err){
            console.log(err);
            reject(err);  
        }    
    })  
}



/**
 * Export to others
 */
module.exports = {
    getNextValue: getNextValue
}