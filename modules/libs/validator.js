var check = require("validator").check,
    fs = require("fs");

var Validator = {
  validationErrors: [],

  validate: function(modelName, object, callback) {
    var validationsFilePath = __dirname + "/../app/validations/" + modelName + ".validations.json";
    var that = this;

    fs.stat(validationsFilePath, function(err) {
      if (err) {
        return console.log("Error reading validations file.");

      } else {
        var content = fs.readFileSync(validationsFilePath, "utf8"),
            validations = JSON.parse(content);

        that.validationErrors = [];

        for (var fieldValidationIndex in validations) {
          for (var fieldName in validations[fieldValidationIndex]) {
            that.validateField(fieldName, validations[fieldValidationIndex][fieldName], object[fieldName]);
          }
        }

        return callback((that.validationErrors.length > 0 ? that.validationErrors : null));
      }
    });
  },

  flashErrors: function(req, errors) {
    for (var errorIndex in errors) {
      this.messages.addMessage(req, "error", errors[errorIndex]);
    }
  },

  validateField: function(fieldName, fieldValidations, value) {
    for (var validatorIndex in fieldValidations) {
      for (var validator in fieldValidations[validatorIndex]) {
        this.useValidator(fieldName, validator, fieldValidations[validatorIndex][validator], value);
      }
    }
  },

  useValidator: function(fieldName, validatorName, argument, value) {
    switch (validatorName) {
      case "minimumLength":
        return this.validatorMinimumLength(fieldName, value, argument);
      default:
        return console.log("Validator (" + validatorName + ") has not been found.");
    }
  },

  validatorMinimumLength: function(fieldName, value, length) {
    var errorMessage = "The value entered for \"" + fieldName + "\" (" + value + ") is too short (minimum of " + length + " character(s)).";

    try {
      return check(value, errorMessage).len(length);
    } catch (e) {
      return this.validationErrors.push(e.message);
    }
  }
};

module.exports = Validator;