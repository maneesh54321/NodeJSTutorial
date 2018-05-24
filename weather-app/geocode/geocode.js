const request = require('request');

var geocodeAddress=(address,callback) => {
    var encodedAddress=encodeURIComponent(address);
    //console.log(encodedAddress);

    request({
        url:'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress,
        json:true //Telling that we want to accept some json data back. If uri can support that, go ahead!!
    },(error, response, body)=>{
        if(error){
            callback('Unable to connect to google servers!!');
            //console.log('Unable to connect to google servers!!');
        } else if(body.status==='ZERO_RESULTS'){
            console.log('Location not found!!');
        } else if(body.status==='OK'){
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });
            //console.log(JSON.stringify(body,undefined,2)); //Pretty priniting JSON string. here, 2 is number of spaces for indentation.
            //console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
            //console.log(`Longitude : ${body.results[0].geometry.location.lng}`)
        } else{
            callback('Unable to connect to google servers!!');
        }
    });
}

module.exports.geocodeAddress=geocodeAddress;