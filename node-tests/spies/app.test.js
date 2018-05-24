const expect=require('expect');
const rewire=require('rewire');

var app=rewire('./app'); //use require to import this module and add some methods to it like app.__set__ and app.__get__

describe('App', () => {
    it('should call the spy correctly',() => {
        var spy=expect.createSpy();
        spy('Andrew',25); //if spy is not called ever then this test fails
        // expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('Andrew',25); //checks if the spy was called with these specific args
    });

    var db={
        saveUser: expect.createSpy()
    };
    app.__set__('db',db);

    it('should call saveUser with user Object', () => {
        var email='maneesh54321@gmail.com';
        var password='123abc';
        app.handleSignup(email,password);
        expect(db.saveUser).toHaveBeenCalledWith({email,password});
    });
});