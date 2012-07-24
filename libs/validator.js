var check = require('validator').check,
    fs = require('fs');

var Validator = {
    validationErrors: [],

    // validates an object and return, return its errors
    validate: function(modelName, object, callback) {
        var validationsFilePath = __dirname + '/../app/validations/' + modelName + '.validations.json';
        var that = this;

        fs.stat(validationsFilePath, function(err) {
            if (err) {
                console.log('Error reading validations file.');
                return callback(null);

            } else {
                var content = fs.readFileSync(validationsFilePath, 'utf8'),
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

    // validates a field with it's specified validations
    validateField: function(fieldName, fieldValidations, value) {
        for (var validatorIndex in fieldValidations) {
            for (var validator in fieldValidations[validatorIndex]) {
                this.useValidator(fieldName, validator, fieldValidations[validatorIndex][validator], value);
            }
        }
    },

    // uses a specified validator with a specified value
    useValidator: function(fieldName, validatorName, argument, value) {
        if (this.valiators[validatorName] !== undefined) {
            return this.validators[validatorName](fieldName, value, argument);            
        } else {
            return console.log('Validator (' + validatorName + ') has not been found.');
        }
    },
    
};

module.exports = Validator;