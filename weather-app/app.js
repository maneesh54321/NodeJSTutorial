const request=require('request');
const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');

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

geocode.geocodeAddress(argv.address,(errorMessage,results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else{
        console.log(JSON.stringify(results,undefined,2));
        weather.getWeather(results.latitude,results.longitude,(errorMessage,results) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(`Its currently ${results.temperature} but it feels like ${results.apparentTemperature}`);
            }
        })
    }
});

// 53d7c2502951f0966a040ea5c1882f66