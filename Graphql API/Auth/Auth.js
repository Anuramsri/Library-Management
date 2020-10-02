const bcrypt = require('bcrypt');
const saltRounds = 10;

var hash = (password)=>{
    return bcrypt.hashSync(password, saltRounds);
}

var auth = (password,hash)=>{
    return bcrypt.compareSync(password, hash); 
}

module.exports = {
    hash: hash,
    auth: auth
}