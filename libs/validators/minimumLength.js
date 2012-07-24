module.export = function(fieldName, value, length) {
    var errorMessage = 'The value entered for \'' + fieldName + '\' (' + value + ') is too short (minimum of ' + length + ' character(s)).';

    try {
        return check(value, errorMessage).len(length);
    } catch (e) {
        return this.validationErrors.push(e.message);
    }
}