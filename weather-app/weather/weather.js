const request=require('request');

var getWeather=(latitude, longitude, callback) => {
    request({
        url:`https://api.darksky.net/forecast/53d7c2502951f0966a040ea5c1882f66/${latitude},${longitude}`,
        json:true
    },(error, response, body) => {
        if(!error && response.statusCode===200){
            callback(undefined,{
                temperature:body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature
            });
            //console.log(`temperature : +${body.currently.temperature}`);
        } else{
            callback('Unable to fetch weather!!');
            //console.log('Unable to fetch weather!!');
        }
    });
}

module.exports.getWeather=getWeather;