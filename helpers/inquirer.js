const inquirer = require("inquirer");
const Searches = require("../models/Searches");
require("colors");


const inquirerMenu = async () => {
    const menuOptions = [
        {
          type: "list",
          name: "option",
          message: "Que desea hacer?",
          choices: [
            {
              value: 1,
              name: "1.   Buscar ciudad",
            },
            {
              value: 2,
              name: "2.    Historial",
            },
            {
              value: 0,
              name: "      Salir",
            },
          ],
        },
      ];
  try {
    const opt = await inquirer.prompt(menuOptions);
    return opt;
  } catch (err) {
    console.log(err);
  }
};
const inquirerPause = async () => {
    const pauseOptions = [
        {
          type: "input",
          name: "pause",
          message: `Presione ${"ENTER".green} para continuar`,
        },
      ];
  try {
    const pause = await inquirer.prompt(pauseOptions);
    console.clear();

  } catch (err) {
    console.log(err);
  }
};
const readInput =async (message) => {
    const question = [
        {
            type: 'input',
            name:'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }

        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}
const listPlaces = async  (places=[]) =>{
  const choices= places.map((place,index)=>{
    return{
      value: place.id,
      name: `${`${index}`.green} ${place.name}`
    }
  });
  choices.unshift({value:0,name:'Cancelar'}); //add to the begin
  const questions=[
    {
      type: 'list',
      name:'id',
      message:'¿Cual es el lugar?',
      choices
    }
  ]
  const {id} = await inquirer.prompt(questions);
  const selectedPlace = places.find(places => id===places.id);

  return selectedPlace;
}
const confirmAction=async(message)=>{
  const question = [
    {
      type:'list',
      name:'answer',
      message,
      choices:[
        {
          name: `${`Si`.green}, Estoy seguro`,
          value:true
        },
        {
          name: `${`No`.red}, Cancelar`,
          value:true
        }
      ]
    }
  ]

  const {answer} = await inquirer.prompt(question);
  return answer;
}
const showCheckList = async  (tasks=[]) =>{
  const choices= tasks.map((task,index)=>{
    return{
      value: task.id,
      name: `${`${index}`.green} ${task.descript}`,
      checked: task.completed ?true :false
    }
  });
 
  const questions=[
    {
      type: 'checkbox',
      name:'ids',
      message:'¿Que tarea desea completar?',
      choices
    }
  ]
  const {ids} = await inquirer.prompt(questions);
  return ids;
}
module.exports = { inquirerMenu, inquirerPause,readInput, listPlaces, showCheckList};
