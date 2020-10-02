const MongoModels = require('./Models');
const auth = require('./Auth/Auth');

/**Common Methods */

let getAll = async (type)=>{
    let result = await MongoModels[type].find({});
    return result;
}

let add = async (type,data)=>{
    let result = MongoModels[type].create(data);
    return result;
}

let remove = async (type,data)=>{
    let result = await MongoModels[type].remove(data);
    return result;
}

let update = async (type,data)=>{
    let result =  MongoModels[type].findByIdAndUpdate(data._id, {
        ...data,
    }, {
        new: true
    });
    return result;
}

/**Others */

let login = async (req,res)=>{
    var result = await MongoModels['user'].find({email: req.body.user});
    if(result.length){
        result = result[0];
        var promise = new Promise((resolve,reject)=>{
           resolve(auth.auth(req.body.password,result.password));
        });
        promise.then((compare)=>{
            if(compare){
                 res.status(200).json({
                        status: "Success",
                        result: {
                            name: result.name,
                            email: result.email,
                            role: result.role
                        }
                    });
            }
            else{
                res.status(200).json({
                    status: "Success",
                    error: "Authentication Failed!"
                });
            }
        }).catch(()=>{
            res.status(500).json({
                status: "Failure",
                error: "Unable to Authenticate!"
            });
        })
    }
    else{
        res.status(200).json({
            status: "Success",
            error: "User Not Found!"
        });
    }
}

/**exports */

module.exports = {
    getAll : getAll,
    add: add,
    remove: remove,
    update: update,
    login: login
}