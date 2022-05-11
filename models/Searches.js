const axios = require('axios');
class Searches{
    history = ['slp','mexico','san jose'];
    constructor(){
    }

    get paramsMapBox(){
        return{
            'limit':4,
            'language':'es',
            'access_token':process.env.MAPBOX_KEY
        }
    }

    async city(place=''){
        //http request
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })
            const response = await instance.get();

            return response.data.features.map( place =>{
                return{
                    id: place.id,
                    name: place.place_name,
                    lg:place.center[0],
                    lt:place.center[1]
                }
            });

        }catch(err){
            return [];
        }

    }

    async weather(lat, lg){
        try{
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params:{
                    'lat':lat,
                    'lon':lg,
                    'appid':process.env.OPENWEATRHER_KEY,
                    'units':'metric',
                    'lang':'es'
                }
            });
            const response =  await instance.get();
            console.log("####");
            return response.data
        }catch(err){
            return null;
        }
    }
}


module.exports = Searches;