require("coffee-script");

// todo: put this somewhere else
process.env['MONGODB_HOST'] = 'linux.brainpad.org';
process.env['MONGODB_DATABASE'] = 'thinair';

require("ncore/modules/moduleLoader").core(require("path").join(__dirname, "modules"));