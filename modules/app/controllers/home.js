module.exports = {
  index: function(req, res) {
    this.helpers.flash(req, 'error', 'Testing messages');

    res.render('index', {
      title: 'ThinAir'
    });
  }
};