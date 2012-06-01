var SessionsHelpers = {
  // checks if a request is authorized
  checkIfAuthorized: function(req, res) {
    if (req.session.is_logged) {
      return true;
    } else {
      this.messages.addMessage(req, "error", "You need to be logged in to access this page.");
      return res.redirect("/");
    }
  }
};

module.exports = SessionsHelpers;