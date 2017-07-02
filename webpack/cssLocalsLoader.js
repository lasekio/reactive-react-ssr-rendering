module.exports = function(source) {
    console.log('MY LOADER', source);

    return source += ';module.exports = exports.locals;';
};