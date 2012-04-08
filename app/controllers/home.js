module.exports = {
  index: function (req, res) {
    this.helpers.flash(req, 'error', 'test yeah right');
    
    res.render('index', { title: 'ThinAir' });
  }
};