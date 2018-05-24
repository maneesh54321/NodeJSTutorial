var moment= require('moment');

// Jan 1st 1970 00:00:00 am

//var date = moment();

//date.add(1,'years').subtract(9,'months');

//console.log(date.format('MMM Do , YYYY'));

var someTimestamp=moment().valueOf();
console.log(someTimestamp);

var createdAt=12345;
var date=moment(createdAt);

console.log(date.format('h:mm a'))