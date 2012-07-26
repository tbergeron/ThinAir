var check = require('validator').check;

module.exports = function(fieldName, value, argument, validationErrors) {
    var errorMessage = 'The value entered for \'' + fieldName + '\' (' + value + ') is not an email address.';

    try {
        if (argument) {
            return check(value, errorMessage).isEmail();
        } else {
            return false;
        }
    } catch (e) {
        return validationErrors.push(e.message);
    }
}