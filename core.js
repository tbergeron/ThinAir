process.env['MONGODB_HOST'] = 'linux.brainpad.org';

require("ncore/modules/moduleLoader").core(
    require("path").join(__dirname, "modules")
)