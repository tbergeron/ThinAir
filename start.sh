rm -rf ./modules/libs/*.js
coffee --compile ./modules/libs
node core.js