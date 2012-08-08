// var Session = require("routil-session"),
//     MongoStore = require('mongo-store'),
//     session = Session({
    //     store: new MongoStore({
    //                 collection: require("mongo-col")("sessions", process.env.MONGODB_DATABASE),
    //                 db: process.env.MONGODB_DATABASE,
    //                 host: process.env.MONGODB_HOST,
    //                 port: process.env.MONGODB_PORT,
    //                 username: process.env.MONGODB_USER,
    //                 password: process.env.MONGODB_PASSWORD
    //             })
    // })

module.exports = require('ajn-session').Session