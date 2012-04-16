var moduleLoader = require("ncore/modules/moduleLoader");

// todo: put this somewhere else
process.env['MONGODB_HOST'] = 'linux.brainpad.org';
process.env['MONGODB_DATABASE'] = 'thinair';

moduleLoader.core(require("path").join(__dirname, "modules"));