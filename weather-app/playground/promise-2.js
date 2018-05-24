const request=require('request');

var geocodeAddress=(address) => {
    var encodedAddress=encodeURIComponent(address);

    return new Promise((resolve,reject) => {
        request({
            url:'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress,
            json:true
        },(error,response,body) => {
            if(error){
                reject('Unable to connect to google servers!!');
            } else if(body.status==='ZERO_RESULTS'){
                reject('Location not found!!');
            } else if(body.status==='OK'){
                resolve({
                    address:body.results[0].formatted_address,
                    latitude:body.results[0].geometry.location.lat,
                    longitude:body.results[0].geometry.location.lng
                });
            } else{
                reject('Unable to connect to google servers!!');
            }
        });
    });
};

geocodeAddress(560100).then((results) => {
    console.log(JSON.stringify(results,undefined,2));
}, (errorMessage) => {
    console.log(errorMessage);
});

