const axios = require('axios');
const fs = require('fs');

class Searches{
    history = [];
    dbPath = './db/places.json';
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
    saveDB(){
        const payload ={
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    handleHistory(place=''){
        // prevent duplicated data
        if(!this.history.includes(place.toLocaleLowerCase())){
            this.history.unshift(place.toLocaleLowerCase());
            // save in db (file)
            this.saveDB();
        }
    }


    readDB(){
        if(!fs.existsSync(this.dbPath)){
            return;
        }
        const data = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        this.history=JSON.parse(data).history;
    }
}


module.exports = Searches;