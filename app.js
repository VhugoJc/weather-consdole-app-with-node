const {readInput, inquirerMenu, inquirerPause} = require("./helpers/inquirer");
const Searches = require('./models/Searches');
require('dotenv').config(); //enviroment variables

//create instance
const search = new Searches();


const main = async() =>{
    let opt = 1;
    console.clear();
    
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
                break;
            case 2:
                console.log("Historial");
                break;
            default:
                console.log("Error");
        }
        if(opt!==0) await inquirerPause();
    }
}

main();