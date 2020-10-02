const config = require('../Config/Config');
const mongoose = require('mongoose');

let dbInit = function() {
    try {
        let db = mongoose.connection; 
        mongoose.connect(`mongodb://${config.DATABASE.HOST}:${config.DATABASE.PORT}/${config.DATABASE.DB}`, { useNewUrlParser: true });
        db.on('open',  function() {
            console.log('Database is connected...');
        });
        db.on('error', function(err) {
            console.log(err);
            console.log('Database connection error ...');
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    dbInit: dbInit
}