var Core =  Object.create(require("./node_modules/ncore/lib/core")).constructor(),
            moduleLoader = Core.use("moduleLoader", 
            require("./node_modules/ncore/modules/moduleLoader")),
            path = require("path");

moduleLoader.load({
  uri:          path.join(__dirname, "./app"),
  core:         Core,
  dependencies: require("./app/dependency.json"),
  callback:     init
})

function init(err) {
  if (err) {
    return console.log("error happened", err)
  }
  
  Core.init()
}