var SessionsHelpers = {
    // checks if a request is authorized
    checkIfAuthorized: function(req, res) {
        // TODOTB: change this for the new session system
        if (req.session.is_logged) {
            return true;
        } else {
            this.messages.addMessage(req, 'error', 'You need to be logged in to access this page.');
            return res.redirect('/');
        }
    }
};

module.exports = SessionsHelpers;