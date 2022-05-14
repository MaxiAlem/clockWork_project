import {dataList, getZones,createHTML } from './js/api.js';

const submit = document.querySelector('#submit');
const container = document.querySelector('#container');
const zoneList = document.querySelector('#zoneList');
const url = `https://worldtimeapi.org/api/timezone/`;
let timezones = []

//eventos
eventListener();

function eventListener(){
    
    submit.addEventListener('click', submitForm)
    document.addEventListener('DOMContentLoaded', ()=> {
        document.getElementById("search").focus();
        dataList();//lista de sugerencias
        
        timezones = JSON.parse(localStorage.getItem('timezones')) || [];
        createHTML(timezones)
        setInterval(() => {
        createHTML(timezones)        
        }, 60000);
    //verificamos el localstorage para modificar el timezone de la app 
     //en base al LS
        
    });

}
function submitForm(e){
    e.preventDefault()
    
    timezones = [...timezones, getZones()]
    updateLS()
    createHTML(timezones)
}

function updateLS(){
    localStorage.setItem('timezones',JSON.stringify(timezones));
}
 //modificamos el timezones agregandle el urlName al array

function deleteZone(thiszone){
    // DELETE /timezones/:name -> Elimina un timezone específico del usuario.
    console.log(`borrando ${thiszone }`)
    timezones = timezones.filter(zone => zone !== thiszone)
    console.log(timezones)
    createHTML(timezones)
    
    }


export {deleteZone, updateLS}
