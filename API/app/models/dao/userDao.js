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
const user = require('../dto/user');

/*
 * retrieve the required modules
 */
const _ = require('lodash');
const userServices = require("../../services/userServices");

//Import Counter Dao for auto increament _id
const counterDao = require('../dao/counterDao');

/*
 * Add User
 */
let addUser = async function(queryparam) {
    return new Promise(async function(resolve, reject) {
        try {
            let hash = userServices.passwordHash(queryparam.password);
            let value = await counterDao.getNextValue("userid");
            var query = {
                _id: 'user_' + value,
                name: queryparam.name,
                password: hash,
                email: queryparam.email,
                mobileNumber: queryparam.mobileNumber,
                roleId: queryparam.roleId,
            };

            let userResult = await user.findOneAndUpdate({
                name: queryparam.name
            }, query, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            });
            resolve(userResult);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

// let getNextValue=function (sequence){
//     console.log(sequence);
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;

//          let DB = db.db('ASYNCDB')
//         var document=DB.collection("counters").findAndModify({
//             query:{_id:sequence},
//             update:{$inc:{sequence_value:1}},
//             new:true
//             }).then(resp=>{
//                 console.log(resp);
//             });
//             console.log("Database created!");
//             console.log(document.sequence_value)
//             return document.sequence_value;

//         // 
//         //db.close();
//       });

// }

/*
 * Get All User
 */
let getAllUser = async function() {
    return new Promise(async function(resolve, reject) {

        try {
            resolve(
                    await user.find({}))
        } catch (err) {
            reject();
        }

    });
};


/*
 * Get User by Id
 zoneid parameter is to get zoneid from this function
 */
// let getUserByFields = async function(data, zoneid) {
//     return new Promise(async function(resolve, reject) {
//         try {
//             resolve(await user.find(data.query, data.fields, data.options).populate('roleId', 'role')
//                 .populate('zoneId', 'name').then(
//                     resp => {
//                         if (resp[0] && resp[0]['_doc'] && !zoneid) {
//                             resp[0]['_doc'].roleName = resp[0]['roleId'].role;
//                             if (resp[0]['zoneId']) {
//                                 resp[0]['_doc'].zoneName = resp[0]['zoneId'].name;
//                                 delete resp[0]['_doc']['zoneId'];
//                             }
//                             delete resp[0]['_doc']['roleId'];
//                         }
//                         // console.log(resp[0]['_doc'])
//                         return resp;
//                     }
//                 ));
//         } catch (err) {
//             console.log(err);
//             reject(err);
//         }
//     });
// };



/*
 * Update User
 */
let updateUser = async function(updateData) {
    return new Promise(async function(resolve, reject) {

        try {
            resolve(await user.findOneAndUpdate({
                _id: updateData.query._id
            }, updateData.update, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }))
        } catch (err) {
            reject();
        }

    });
};


/*
 * Delete User
 */
let deleteUser = async function(searchField) {
    return new Promise(async function(resolve, reject) {

        try {
            resolve(await user.findByIdAndRemove({ _id: searchField }))
        } catch (err) {
            reject(err);
        }
    });
};


let updatePassword = function(id, passwd) {
    return new Promise(async(resolve, reject) => {
        try {
            let hash = userServices.passwordHash(passwd);
            let result = await user.update({
                _id: id,
            }, {
                $set: {
                    password: hash
                }
            })
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Export to others
 */
module.exports = {
    addUser: addUser,
    // getUserByFields: getUserByFields,
    getAllUser: getAllUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    updatePassword: updatePassword
}