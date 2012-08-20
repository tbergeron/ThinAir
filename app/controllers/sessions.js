var ThinAir = require('thinair')

module.exports = ThinAir.createController({
    create: function(req, res, params) {
        req.sessions.setData('userId', 9)
        res.end()
    },

    get: function(req, res, params) {
        var data = req.sessions.getData('userId')
        
        if (data) {
            res.write(JSON.stringify(data))
        }

        res.end()
    }
})