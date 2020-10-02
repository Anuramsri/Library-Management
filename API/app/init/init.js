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
'use strict';

const db = require('../models/db');
/*
 * Defines the routes of the expressApplication
 */
async function serverInit() {    
    /*
     * init database
     */
    await db.dbInit();
    console.log('Server Initialized');
}

exports.serverInit = serverInit;