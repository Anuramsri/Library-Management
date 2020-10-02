/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

'use strict';

/*
 * retrieve the required modules
 */
const _ = require('lodash');
// const authService = require('../services/authService');
/**
 *  Import DAO
 */
const userDao = require('../models/dao/userDao');


/*
 * Add User
 */
let addUser = async function(req, res) {

    try {
        let result = await userDao.addUser(req.body)
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

}


/*
 * Get All User
 */
let getAllUser = async function(req, res) {

    try {
        let result = await userDao.getAllUser()
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

};


// /*
//  * Get User by Id
//  */
// let getUserByFields = async function(req, res) {

//     let searchFormat = {
//         "query": {
//             _id: req.params.id
//         },
//         "fields": {},
//         "options": {}
//     };
//     console.log(searchFormat)
//     try {
//         let result = await userDao.getUserByFields(searchFormat)
//         res.status(200).json({
//             status: "Success",
//             result: result
//         });
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({
//             status: "Failure"
//         });
//     }

// };


/*
 * Update User
 */
let updateUser = async function(req, res) {
    var QueryAndUpdate = {
        query: {
            _id: req.params.id
        },
        update: req.body
    }

    try {
        let result = await userDao.updateUser(QueryAndUpdate)
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

};


/*
 * Delete User
 */
let deleteUser = async function(req, res) {

    try {
        let result = await userDao.deleteUser(req.params.id)
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

};


// let updatePassword = async function(req, res) {
//     try {
//         if (req.body.old) {
//             let oldPassword = req.body.old;
//             let newPassword = req.body.new;
//             // var adminQuery = {
//             //     "query": {
//             //         _id: req.body._id,
//             //     },
//             //     "fields": 'password',
//             //     "options": {}
//             // };
//             // let user = await userDao.getUserByFields(adminQuery, true);
//             var isAuthenticated = false;
//             isAuthenticated = authService.comparePassword(oldPassword, user[0].password);
//             if (isAuthenticated) {
//                 let result = await userDao.updatePassword(req.body._id, newPassword);
//                 res.status(200).json({
//                     status: "Success",
//                     result: result
//                 })
//             } else {
//                 res.status(200).json({
//                     status: 'credentials are not correct'
//                 });
//             }
//         } else {
//             let newPassword = req.body.new;
//             // var adminQuery = {
//             //     "query": {
//             //         _id: req.body._id,
//             //     },
//             //     "fields": 'password',
//             //     "options": {}
//             // };
//             // let user = await userDao.getUserByFields(adminQuery, true);
//             let result = await userDao.updatePassword(req.body._id, newPassword);
//             res.status(200).json({
//                 status: "Success",
//                 result: result
//             })
//         }
//     } catch (error) {
//         res.send(error)
//     }
// }


/**
 * Export to others
 */
module.exports = {
    addUser: addUser,
    // getUserByFields: getUserByFields,
    getAllUser: getAllUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    // updatePassword: updatePassword
}