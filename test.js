var anger = {
    scream: function() { console.log('hello world'); }
};

module.exports = anger;

// NOTE TO RAYNOS: Will be executed, at runtime.
console.log("object with a function scream is expected here");
console.log("since it's in the same file:");
console.log(anger);