var asyncAdd= (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a ==='number' && typeof b ==='number'){
                resolve(a+b);
            }else{
                reject('Arguments must be numbers!!');
            }
        },1500);
    });
}

// asyncAdd(10,'sdasd').then((res) => {
//     console.log('Result: '+res);
//     return asyncAdd(res,33);
// }, (errorMessage) => {
//     console.log(errorMessage);
// }).then((res) => {
//     console.log('Should be 45 '+res);  //Should be 45 undefined  ...in case the first asyncAdd rejects...so using catch in case of promise chaining is better.
// },(errorMessage) => {
//     console.log(errorMessage);
// });

asyncAdd(10,2).then((res) => {
    console.log('Result: '+res);
    return asyncAdd(res,'33');
}).then((res) => {
    console.log('Should be 45 '+res);
}).catch((errorMessage) => { //works exactly like java's catch...if one promise reject, the following promises are not executed and error get caught in this catch.
    console.log(errorMessage);
});

// var somePromise=new Promise((resolve, reject) => {
//     setTimeout(() =>{
//         resolve('Hey! It worked!');//Promises can be resolved/rejected only one time no matter how many time we call them unlike callback function which can be executed n number of times..
//         resolve(); //this one never get called if above resolve is not commented
//         reject('Unable to fulfill promise!!'); //this one never get called...if above resolves are not commented!
//     },2500);
// });

// somePromise.then((message) => {
//     console.log('Success: '+ message);
// },(errorMessage) => {
//     console.log('Error: '+errorMessage);
// });