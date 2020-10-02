/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

'use strict';

const bcrypt = require('bcryptjs');

var passwordHash = function(password){
    return bcrypt.hashSync(password);
}

module.exports = {
    passwordHash: passwordHash
}