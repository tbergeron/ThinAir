var check = require('validator').check

module.exports = function(fieldName, value, length, validationErrors) {
    var errorMessage = 'The value entered for \'' + fieldName + '\' (' + value + ') is too long (maximum of ' + length + ' character(s)).'

    try {
        return check(value, errorMessage).max(length)
    } catch (e) {
        return validationErrors.push(e.message)
    }
}