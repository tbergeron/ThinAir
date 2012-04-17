var check = require('validator').check,
    fs    = require('fs'),
    flash = require('./helpers').flash;

var Validator = {
  validationErrors: [],

  // validates an object with its dedicated validations.json file.
  validate: function validates(modelName, object, callback) {
    var validationsFilePath = __dirname + '/../app/validations/' + modelName + '.validations.json',
        that = this;

    fs.stat(validationsFilePath, function(err) {
      if (!err) {
        var content = fs.readFileSync(validationsFilePath, 'utf8');
        var validations = JSON.parse(content);

        // clearing last results
        that.validationErrors = [];

        // todo: value must be passed here.
        for (var fieldValidationIndex in validations) {
          for (var fieldName in validations[fieldValidationIndex]) {
            that.validateField(fieldName, validations[fieldValidationIndex][fieldName], object[fieldName]);
          }
        }

        // once the validators have been executed, callback with the results.
        callback((that.validationErrors.length > 0) ? that.validationErrors : null);

      } else {
        console.log('Error reading validations file.');
      }
    });
  },

  flashErrors: function flashErrors(req, errors) {
    for (var errorIndex in errors) {
      flash(req, 'error', errors[errorIndex] + '<br />');
    }
  },

  // fetches field's validations and uses validators
  validateField: function validateField(fieldName, fieldValidations, value) {
    for (var validatorIndex in fieldValidations) {
      for (var validator in fieldValidations[validatorIndex]) {
        this.useValidator(fieldName, validator, fieldValidations[validatorIndex][validator], value);
      }
    }
  },

  // uses the appropriate validator to validate the field's value
  useValidator: function useValidator(fieldName, validatorName, argument, value) {
    switch (validatorName) {
    case 'minimumLength':
      this.validatorMinimumLength(fieldName, value, argument);
      break;
    default:
      console.log('Validator (' + validatorName + ') has not been found.');
    }
  },

  // validates the minimum length of a string
  validatorMinimumLength: function validatorMinimumLength(fieldName, value, length) {
    var errorMessage = 'The value entered for "' + fieldName + '" (' + value + ') is too short (minimum of ' + length + ' character(s)).';
    try {
      check(value, errorMessage).len(length);
    } catch (e) {
      this.validationErrors.push(e.message);
    }
  }
}

module.exports = Validator;