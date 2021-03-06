const {readInput, inquirerMenu, inquirerPause, listPlaces} = require("./helpers/inquirer");
const Searches = require('./models/Searches');
require('dotenv').config(); //enviroment variables

//create instance
const search = new Searches();

const main = async() =>{
    let opt = 1;
    // read from .json file
    search.readDB();
    
    // console.clear();
    
    while(opt!==0){
        opt = await inquirerMenu();
        opt = opt.option;
        switch(opt){
            case 0:
                console.log("Gracias");
                break;
            case 1:
                //place to search
                place = await readInput("Lugar a buscar: ");
                const placeData = await search.city(place);
                const selectedPlace = await listPlaces(placeData);

                if(selectedPlace===undefined) continue; //if canceled

                search.handleHistory(selectedPlace.name);

                const weatherData = await search.weather(selectedPlace.lt,selectedPlace.lg);
                
                console.log("\n INFORMACION OBTENIDA \n".green);
                console.log("Ciudad: ",`${selectedPlace.name}`.green);
                console.log("Latitud: ",selectedPlace.lt);
                console.log("Longitud: ",selectedPlace.lg);
                console.log("Temperatura Minima: ",`${weatherData.main.temp} °C`);
                console.log("Temperatura Minima: ",`${weatherData.main.temp_min} °C`);
                console.log("Temperatura Maxima: ",`${weatherData.main.temp_max} °C`);
                console.log("Descripcion: ",weatherData.weather[0].description);
                break;
            case 2:
                console.log("Historial");
                search.history.forEach((place,index)=>{
                    console.log(
                        `${`${index+1}.-`.green} ${place}`
                    );
                })
                break;
            default:
                console.log("Error");
        }
        if(opt!==0) await inquirerPause();
    }
}

main();