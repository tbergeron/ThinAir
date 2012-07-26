var check = require('validator').check;

module.exports = function(fieldName, value, argument, validationErrors) {
    var errorMessage = 'The value entered for \'' + fieldName + '\' (' + value + ') is too long (maximum of ' + length + ' character(s)).';

    try {
        if (argument) {
            return check(value, errorMessage).isCreditCard();
        } else {
            return false;
        }
    } catch (e) {
        return validationErrors.push(e.message);
    }
}