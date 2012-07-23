module.exports = function(router, getAction) {
    router.add('/', getAction('home', 'index'));

    // sessions test routes
    router.add('/sessions/create', getAction('sessions', 'create'));
    router.add('/sessions/get', getAction('sessions', 'get'));
    
    // router test routes
    router.add('/routes/test', getAction('routes', 'test'));

    router.add('/validators', getAction('home', 'validators'));

    router.add('/projects', getAction('home', 'projects'));
};