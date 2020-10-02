/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

 
"use strict";
const server = require('./listener/server');
const serverInit = require('./app/init/init');
const router = require('./app/routes/router');

serverInit.serverInit();
server.start(router.router);