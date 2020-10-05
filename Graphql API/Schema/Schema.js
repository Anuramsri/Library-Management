const graphql = require('graphql');
const { GraphQLObjectType,GraphQLString, GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList }  =  graphql;
const dao = require('../Methods');
const auth = require('../Auth/Auth');
// const imageThumbnail = require('image-thumbnail');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        _id: {  type: GraphQLID },
        name: { type: GraphQLString },
        publisher : { type: GraphQLString },
        author: { type: GraphQLString },
        linked: { type: GraphQLString },
        thumbnail : {type : GraphQLString}
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        _id: {  type: GraphQLID },
        name: { type: GraphQLString },
        email : { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return dao.getAll('book')
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return dao.getAll('user')
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: {type:GraphQLString},
                publisher:  {type:GraphQLString},
                author: {type:GraphQLString},
                thumbnail : {type:GraphQLString}
            },
            resolve(parent,args){
               args.linked = null;
               return dao.add('book',args)
            }
        },
        updateBook: {
            type: BookType,
            args: {
                _id: {type:GraphQLString},
                name: {type:GraphQLString},
                publisher:  {type:GraphQLString},
                author: {type:GraphQLString},
                thumbnail: {type:GraphQLString}
            },
            resolve(parent,args){
               return dao.update('book',args)
            }
        },
        removeBook: {
            type: BookType,
            args: {
                _id: {type:GraphQLString},
            },
            resolve(parent,args){
               return dao.remove('book',args)
            }
        },
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email : { type: GraphQLString },
                mobileNumber: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            resolve(parent,args){
                console.log('in add user')
                let promise = new Promise((resolve,reject)=>{
                    resolve(auth.hash(args.password));
                });
                promise.then((newPassword)=>{
                    args.password = newPassword;
                    console.log('args',args)
                    return dao.add('user',args)
                }).catch(()=>{
                    return 'Error';
                })
            }
        },
        updateUser: {
            type: UserType,
            args: {
                _id: { type: GraphQLString },
                name: { type: GraphQLString },
                email : { type: GraphQLString },
                mobileNumber: { type: GraphQLString },
            },
            resolve(parent,args){
               return dao.update('user',args)
            }
        },
        removeUser: {
            type: UserType,
            args: {
                _id: {type:GraphQLString},
            },
            resolve(parent,args){
               return dao.remove('user',args)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

