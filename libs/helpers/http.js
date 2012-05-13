var HttpHelpers = {
  // is a GET request?
  isGet: function(req) {
    if (req.route.method === "get") {
      return true;
    } else {
      return false;
    }
  },

  // is a POST request?
  isPost: function(req) {
    if (req.route.method === "post") {
      return true;
    } else {
      return false;
    }
  },
  
  // is the request an AJAX call?
  isXHR: function(req, res) {
    if (req.header('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest') {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = HttpHelpers;