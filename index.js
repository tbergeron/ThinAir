var path = require('path'),
    server = require('./libs/server'),
    sockets = require('./libs/sockets'),
    nCore = require('./node_modules/ncore/modules/core'),
    pd = require('pd'),
    fs = require('fs'),
    ThinAir = require('./libs/thinair')

var configFile = path.join(__dirname, '../../config')

if (fs.existsSync(configFile)) {
    require(configFile)
} else {
    // Environment [ DEV | PROD ]
    process.env.ENVIRONMENT = 'DEV';

    // Application Port
    process.env.PORT = 9000;
}

// if using DEV use console-trace for console.log by default
if (process.env.ENVIRONMENT === 'DEV') {
    require('console-trace')({ always: true })
}

var nCoreStart = pd.extend(Object.create(ThinAir), {
    start: function(callback) {
        nCore({
            uri: __dirname,
            dependencyMapper: {
                uri: __dirname,
                jsonUri: path.join(__dirname, "libs", "dependency.json")
            }
        }, function(err) {
            if (err) {
                console.error('Error starting nCore:', err)
                process.exit(0);
            } else {
                var serverInstance = server.startServer()

                // socket.io initialization
                sockets.initialize(serverInstance)
            }
        })
    }
})

// // if it's called by node
// if (require.main === module) {
//     nCoreStart(function(err){
//         if (err) {
//             console.error('Error starting nCore:', err)
//             process.exit(0);
//         } else {
//             var serverInstance = server.startServer()

//             // socket.io initialization
//             sockets.initialize(serverInstance)
//         }
//     });
// }

module.exports = nCoreStart
