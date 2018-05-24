//add User(id,name,room)
//remove User(id)
//getUser(id)
//getUserList(room)

// Normal approach
// var users=[];

// var addUser= (id,name, room) =>{
//     usrs.push({});
// }

// but we will use ES6 classes
// class Person {
//     constructor(name, age) {  // exact behaviour as constructor function in javascript
//         this.name=name;
//         this.age=age;
//     }

//     getPersonDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user= this.getUser(id);

        if(user){
            this.users=this.users.filter((user)=> user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user)=>user.id === id)[0];
    }

    getUserList(room) {
        var users=this.users.filter((user)=> user.room === room);
        var namesArray=users.map((user)=> user.name);
        return namesArray;
    }
}

module.exports = { Users };