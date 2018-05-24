const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'test1',
            room: 'testRoom1'
        }, {
            id: '2',
            name: 'test2',
            room: 'testRoom2'
        }, {
            id: '3',
            name: 'test3',
            room: 'testRoom1'
        }]
    });

    it('should add new user', () => {
        let users = new Users();

        let user = {
            id: '123',
            name: 'TestName',
            room: 'Students'
        }

        let res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
       var userId='1';
       var user=users.removeUser(userId);
       expect(user.id).toBe(userId);
       expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId='99';
        var user=users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user with specified id', () => {
        var userId = '2';
        let res = users.getUser(userId);
        expect(res.id).toBe(userId);
    });

    it('should not find a user with specified id', () => {
        var userId = '99';
        let res = users.getUser(userId);
        expect(res).toNotExist();
    });

    it('should return names of testRoom1', () => {
        var userList = users.getUserList('testRoom1');
        expect(userList).toEqual(['test1', 'test3']);
    });

    it('should return names of testRoom2', () => {
        var userList = users.getUserList('testRoom2');
        expect(userList).toEqual(['test2']);
    });
});