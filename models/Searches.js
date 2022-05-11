const axios = require('axios');
class Searches{
    history = ['slp','mexico','san jose'];
    constructor(){
    }

    get paramsMapBox(){
        return{
            'limit':9,
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

            console.log(response.data);
            return [];

        }catch(err){
            
        }

    }
}


module.exports = Searches;