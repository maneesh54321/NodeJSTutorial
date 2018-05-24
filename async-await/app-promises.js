const users = [{
    id: 1,
    name: 'Maneesh',
    schoolId: 101
}, {
    id: 2,
    name: 'Hari',
    schoolId: 999
}];

const grades = [{
    id:1,
    schoolId:101,
    grade:86
},{
    id:2,
    schoolId:999,
    grade:100
},{
    id:1,
    schoolId:101,
    grade:80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });

        if(user){
            resolve(user);
        } else {
            reject(`Unable to find user with id od ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade)=> grade.schoolId === schoolId));
    });
};

const getStatus=(userId)=>{
    let user;
    return getUser(userId).then((resUser) => {
        user=resUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        console.log(grades.length);
        if(grades.length>0){
            average=grades.map((grade)=>grade.grade).reduce((a,b) => a+b)/grades.length;
        }
        return `${user.name} has an average of ${average} in class.`;
    });
}

// async and await

const getStatusAlt= async (userId) => { // OR async function(){
    const user = await getUser(userId); //await is not allowed alone. It must be inside a async function
    const grades= await getGrades(user.schoolId);
    let average = 0;

    if(grades.length>0){
        average=grades.map((grade)=>grade.grade).reduce((a,b) => a+b)/grades.length;
    }

    return `${user.name} has an average of ${average}% in class.`;
};

// const getStatusAlt= async (userId) => {
//     if(userId){
//         return "Maneesh";
//     } else {
//         throw new Error('userId is undefined!!');
//     }    
// };

//Above async function is equivalent to this function which returns a promise

// (userId) => {
//     return new Promise((resolve,reject) => {
//         if(userId){            
//             resolve('Maneesh');
//         } else {
//             reject('userId is undefined!!');
//         }
//     });
// }

// getUser(2).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// });

// getGrades(101).then((grades) => {
//     console.log('Grades',grades);
// });

// getStatus(2).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

//console.log(getStatusAlt()); // Promise

getStatusAlt(1).then((res)=>{
    console.log(res);
}).catch((e)=>console.log(e));