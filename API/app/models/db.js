/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

'use strict';
const mongoose = require('mongoose');
const userDao = require('./dao/userDao');
const Config = require('../../config/config');

//Import Counter Dao for auto increament _id
const counterDao = require('./dao/counterDao');

// function addAdminUser() {
//     return new Promise(async function(resolve, reject) {
//         try {
//             /*
//              * ADD USER ADMIN
//              */
//             let valuerole = await counterDao.getNextValue("roleid");

//             var roleadd = {
//                 _id: "role_" + valuerole,
//                 role: "Admin",
//                 description: "Admin Role"
//             };

//             let rolevalue = await role.findOneAndUpdate({
//                 role: roleadd.role
//             }, roleadd, {
//                 upsert: true,
//                 new: true,
//                 setDefaultsOnInsert: true
//             })
//             console.log("rolevlue Added",rolevalue)   

//             var user = {                
//                 name: "Admin",
//                 description: "ADMIN",
//                 password: "welcome",
//                 email: "adminanu@gmail.com",
//                 roleId: "role_" + valuerole
//             };

//             resolve(await userDao.addUser(user));
//         } catch (err) {
//             reject(err);
//         }
//     });
// }

// async function checkAdminUser() {
//     return new Promise(async function(resolve, reject) {
//         try {
//             /*
//              * add user Administrator
//              */
//             var adminQuery = {
//                 "query": {
//                     name: "Admin",
//                 },
//                 "fields": {
//                     'name': 1
//                 },
//                 "options": {
//                     'limit': 1
//                 }
//             };

//             // let user = await userDao.getUserByFields(adminQuery);
//             // if (!_.isEmpty(user)) {
//             //     console.log("Admin user exists");
//             // } else {
//             //     let addUser = await addAdminUser();
//             //     console.log("addUser called",addUser)
//             // }
//         } catch (err) {
//             // let addUser = await addAdminUser();
//             // console.log("addUser called",addUser)
//             reject(err);
//         }
//     });
// }


async function dbInit() {
    try {
        let db = mongoose.connection;
        mongoose.connect(`mongodb://${Config.database.host}:${Config.database.port}/${Config.database.db}`, { useNewUrlParser: true });
        db.on('open', async function() {
            console.log('Database is connected...'); 
            // await checkAdminUser();       
        });

        db.on('error', function(err) {
            console.log(err);
            console.log('Database connection error ...');
            setTimeout(function() { dbInit(); }, 60000);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.dbInit = dbInit;
