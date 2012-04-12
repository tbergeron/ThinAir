var core          = Object.create(require('ncore')).constructor(),
    moduleLoader  = core.use('moduleLoader', require('ncore/modules/moduleLoader')),
    path          = require('path');

process.env['MONGODB_HOST'] = 'linux.brainpad.org';

moduleLoader.load({
  uri:          path.join(__dirname, './app'),
  core:         core,
  dependencies: require('./dependency.json'),
  callback:     init
});

function init(err) {
  if (err) return console.log(err);
  core.init();
}