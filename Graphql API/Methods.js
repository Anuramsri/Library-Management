const MongoModels = require('./Models');

/**Common Methods */

let getAll = (type)=>{
    return MongoModels[type].find({});
}

let add = (type,data)=>{
    return MongoModels[type].create(data)
}

let remove = (type,data)=>{
    return MongoModels[type].remove(data)
}

let update = (type,data)=>{
   return MongoModels[type].findByIdAndUpdate(data._id, {
        ...data,
    }, 
    {
        new: true
    });
}

/**Others */



/**exports */

module.exports = {
    getAll : getAll,
    add: add,
    remove: remove,
    update: update
}