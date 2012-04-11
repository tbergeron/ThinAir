var core          = Object.create(require('ncore')).constructor(),
    moduleLoader  = Core.use('moduleLoader', require('ncore/modules/moduleLoader')),
    path          = require('path'),
    consoletrace  = require('console-trace');

process.env['MONGODB_HOST'] = 'linux.brainpad.org';

moduleLoader.load({
  uri:          path.join(__dirname, './app'),
  core:         core,
  dependencies: require('./dependency.json'),
  callback:     init
});

function init(err) {
  if (err) return console.t.log(err);
  core.init();
}