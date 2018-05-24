const axios=require('axios')

const yargs=require('yargs');

const argv=yargs.options({
    a:{
        describe:'Address to fetch weather for',
        alias:'address',
        demand:true,
        string:true
    }
})
.help()
.alias('help','h')
.argv;


var encodedAddress=encodeURIComponent(argv.address);

var geoCodeUrl='https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress;

axios.get(geoCodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    // console.log(response.data);
    console.log(response.data.results[0].formatted_address);

    var latitude=response.data.results[0].geometry.location.lat;
    var longitude=response.data.results[0].geometry.location.lng;

    var weatherUrl=`https://api.darksky.net/forecast/53d7c2502951f0966a040ea5c1882f66/${latitude},${longitude}`;
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temperature} but it feels like ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to servers!');
    } else{
        console.log(e.message);
    }
    // console.log(e);
});