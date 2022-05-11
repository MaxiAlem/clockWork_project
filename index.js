import {dataList, submitForm, retrieveData} from './js/api.js';

const submit = document.querySelector('#submit');

//eventos
eventListener();

function eventListener(){
    
    submit.addEventListener('click', submitForm)
    document.addEventListener('DOMContentLoaded', ()=> {
        dataList();//lista de sugerencias
        retrieveData()
        
    });

}



