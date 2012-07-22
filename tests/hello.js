function hello(){
    return "hello world"
}

describe('hello', function(){
    it('should say hello', function(){
        expect(hello()).toBe('hello world');
    });
});