const inquirer = require("inquirer");
require("colors");

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
const deleteTasks = async  (tasks=[]) =>{
  const choices= tasks.map((task,index)=>{
    return{
      value: task.id,
      name: `${`${index}`.green} ${task.descript}`
    }
  });
  choices.unshift({value:0,name:'Cancelar'}); //add to the begin
  const questions=[
    {
      type: 'list',
      name:'id',
      message:'¿Que tarea desea borrar?',
      choices
    }
  ]
  const {id} = await inquirer.prompt(questions);

  if(id===0){
    return null;
  }

  const answer = await confirmAction('Estas seguro de eliminar esta tarea?')

  if(answer){
    return id;
  }

  return null;
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
module.exports = { inquirerMenu, inquirerPause,readInput, deleteTasks, showCheckList};
