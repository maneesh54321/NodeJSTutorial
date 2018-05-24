const expect=require('expect');

const utils=require('./utils');

describe('Utils', () => {
    describe('#Sync functions:',() => {
        it('should add two numbers',() => {
            var res = utils.add(33,11);
            // if(res!==44){
            //     throw new Error(`Expected 44, but got ${res}`);
            // }
            expect(res).toBe(44,`Expected 44, but got ${res}`); //using expect framework
        });
        it('should square the number',() => {
            var res=utils.square(5);
            // if(res!==25){
            //     throw new Error(`Expected 25 but got ${res}`);
            // }
            expect(res).toBe(25).toBeA('number'); //using expect framework
        });
        it('should expect some values',() => {
            // expect(12).toNotBe(12); //error as both are equal
            // expect({name: 'Maneesh'}).toBe({name: 'Maneesh'}); //fails coz two are different object with same values. compares using '==='
            // expect({name: 'Maneesh'}).toEqual({name: 'Maneesh'}); //works as expected.
            // expect({name: 'Maneesh'}).toNotEqual({name: 'maneesh'}); //works as expected
            // expect([1,2,4]).toInclude(2); //pass if the array contains the include element
            // expect([1,2,4]).toExclude(3); //pass if exclude element is not in the array
            // expect({
            //     name:'Maneesh',
            //     age: '25',
            //     location: 'Bengaluru'
            // }).toInclude({age:25}); //works as the object contains include element. //compares using '=='
            expect({
                name:'Maneesh',
                age: '25',
                location: 'Bengaluru'
            }).toExclude({age:26}); //works as the object contains include element. //compares using '=='
        });
        
        it('should verify that first and last name are set',() => {
            var user={
                age:25,
                location:'Bengaluru'
            };
            var modifiedUser=utils.setName(user,'Maneesh Singh');
            // expect(modifiedUser).toBe(user)
            expect(modifiedUser).toInclude({firstName:'Maneesh',lastName:'Singh'}).toBeA('object');
        });
    });

    describe('#Async Functions:',() => {
        /********************************************************/
        /**************Testing asynchronous functions************/
        /********************************************************/
        it('should async add two numbers',(done) => { // need to use done for asynchronous calls
            utils.asysncAdd(4,3, (sum) => {
                //expect(sum).toBe(12).toBeA('number'); //passes if done not specified.never called if 'done' is not specified and called so  mocha assumes that this test case passed. like the test cases with no expect statements.
                expect(sum).toBe(7).toBeA('number'); //passes if done is specified and called.
                //expect(sum).toBe(12).toBeA('number'); //fails if done is specified and called.
                done(); //calling done. tells mocha to check the status now. If not called then mocha waits for 2 sec and marks this as failed with error 'Exceeded 2000ms'.
            })
        });
        
        it('should async square number',(done) => { // need to use done for asynchronous calls
            utils.asysncSquare(3, (sqaure) => {
                expect(sqaure).toBe(9);
                done();
            })
        });
    })
})

