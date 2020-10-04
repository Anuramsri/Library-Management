/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

/**
 * Import dependencies
 */

"use strict";
const express = require('express');
const bodyParser = require('body-parser');
async function start(router) {
    try {
        let app = express();
        let http = require('http').Server(app);

        /* configure the express */
        /* parse application/x-www-form-urlencoded */
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        /* parse application/json */
        app.use(bodyParser.json());

        /*
         * CORS middleware
         */
        var allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            next();
        }
        console.log("next")
        app.use(allowCrossDomain);
        app.use('/uploads', express.static('uploads'));
        /* configure the routes */

        router(app);
        http.listen(3002);
        console.log('Server is running on port ', http.address().port);
    } catch (err) {
        console.log(err);
    }
}

exports.start = start;