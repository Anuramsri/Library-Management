const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/Schema');
const config = require('./Config/Config');
const loginController = require('./Methods');
const db = require('./db/db');

let init = async ()=>{
    await db.dbInit();

    const app = express();
    
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(bodyParser.json());
    var allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();
    }
    app.use(allowCrossDomain);

    app.post('/login',loginController.login);
    
    app.use('/graphql',graphqlHTTP({
        schema,
        graphiql:true
    }));

    app.listen(config.PORT,()=>{
        console.log('Server running on port '+config.PORT);
    })
}

init();