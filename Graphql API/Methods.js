const MongoModels = require('./Models');
const auth = require('./Auth/Auth');

/**Common Methods */

let getAll = async (type)=>{
    let result = await MongoModels[type].find({});
    return result;
}

let add = async (type,data)=>{
    console.log('In mongo add')
    let result = await MongoModels[type].create(data);
    console.log('result',result)
    return result;
}

let remove = async (type,data)=>{
    let result = await MongoModels[type].remove(data);
    return result;
}

let update = async (type,data)=>{
    let result =  await MongoModels[type].findByIdAndUpdate(data._id, {
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

let addBookList = (req,res)=>{
    let userId = req.body.userId;
    let bookId = JSON.parse(req.body.bookId);

    bookId.map(async (val)=>{
        let result =  await MongoModels['book'].findByIdAndUpdate(val, {
            linked: userId
        }, {
            new: true
        });
    });
    res.status(200).json({
        status: "Success",
        result: "Updated Successfully!"
    });
}

let removeBookList = (req,res)=>{
    let userId = req.body.userId;
    let bookId = JSON.parse(req.body.bookId);

    bookId.map(async (val)=>{
        let result =  await MongoModels['book'].findOneAndUpdate({_id:val,linked:userId}, {
            linked: null
        }, {
            new: true
        });
    });
    res.status(200).json({
        status: "Success",
        result: "Updated Successfully!"
    });
}

let getBookList = async (req,res)=>{
    let userId = req.params.userId;
    if(userId){
        let result = await MongoModels['book'].find({linked:userId});
        res.status(200).json({
            status: "Success",
            result: result
        });
    }
    else{
        res.status(200).json({
            status: "Success",
            error: "Get Failed!"
        });
    }
}
   
/**exports */

module.exports = {
    getAll : getAll,
    add: add,
    remove: remove,
    update: update,
    login: login,
    addBookList: addBookList,
    getBookList: getBookList,
    removeBookList: removeBookList
}