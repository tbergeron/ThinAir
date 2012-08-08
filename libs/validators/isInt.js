var check = require('validator').check

module.exports = function(fieldName, value, argument, validationErrors) {
    var errorMessage = 'The value entered for \'' + fieldName + '\' (' + value + ') is not a number.'

    try {
        if (argument) {
            return check(value, errorMessage).isInt()
        } else {
            return false
        }
    } catch (e) {
        return validationErrors.push(e.message)
    }
}