module.exports = {
  initialize: function(req, res) {
    console.log('Testing initializers');
  },

  index: function(req, res) {
    res.render('index', {
      title: 'ThinAir'
    });
  }
};