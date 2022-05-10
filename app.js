const {readInput, inquirerMenu, inquirerPause} = require("./helpers/inquirer");

const main = async() =>{
    let opt = 1;
    while(opt!==0){
        opt = await inquirerMenu();
        opt = opt.option;
        await inquirerPause();
    }
}

main();