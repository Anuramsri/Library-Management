const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/Schema');
const config = require('./Config/Config');
const db = require('./db/db');
const app = express();

let init = async ()=>{
    await db.dbInit();
    
    app.use('/graphql',graphqlHTTP({
        schema,
        graphiql:true
    }));

    app.listen(config.PORT,()=>{
        console.log('Server running on port '+config.PORT);
    })
}

init();