import { deleteZone } from "../index.js";   

  
const url = `http://worldtimeapi.org/api/timezone/`;

// GET /timezones -> Obtiene todos los timezones.
async function dataList(){ 

    try {
        const res = await fetch(url);
        const zones = await res.json()
        addDataList(zones)
    } catch (error) {
        console.log(error)
    }
}
function addDataList(zones){//agrega cada zona a la lista de sugeridos
    zones.forEach(zone =>{
       
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone;
        zoneList.appendChild(option)

    })
}

// GET /timezones/:name -> Obtiene un timezone específico.
 function getZones(){//get timezone especifico

    let name = document.querySelector('#search').value;
    const urlName = (`${url}${name}`)
     return urlName

}

async  function createHTML(timezones){ // PUT /timezones/:name -> Agrega un timezone específico al usuario.
    cleanHTML()
     if(timezones.length > 0){  //foreach
        timezones.forEach(async zone =>{
        //FETCH
        consultApi()
        async function consultApi(){
            try {
                const res = await fetch(zone);
                const data = await res.json()
                //console.log(data)
                time(data)
                } catch (error) {
                console.log(error)
                }
        }
        //FIX
        async function time(data){
           
         const {timezone, datetime} = data
                 //si cortamos el time offset, new Date(datetime) no nos devuelve nuestra hora local
        let datetimeFix = datetime.slice(0, -6)

        const dateFix = (datetimeFix =>{
            const newDate = new Date(datetimeFix)
            return new Intl.DateTimeFormat('es-AR', {dateStyle: 'medium'}).format(newDate)
            })
        const timeFix = (datetimeFix =>{
            const newTime = new Date(datetimeFix)
            return new Intl.DateTimeFormat('es-AR', {timeStyle: 'medium'}).format(newTime)     
             }) 

            //genHTML
            const box = document.createElement('div');
            box.className = 'col border border-4 rounded-3'
            
            const z =document.createElement('h2');
            z.innerHTML = `${timezone}`;

            const t =document.createElement('h2');
            t.innerHTML = `${timeFix(datetimeFix)}`;
            
            const d =document.createElement('h2');
            d.innerHTML = `${dateFix(datetimeFix)}`;

            const deleteBtn=document.createElement('a')
            deleteBtn.textContent= 'X'
            deleteBtn.onclick=()=>{
            deleteZone(zone)
            }
            
            box.appendChild(z);
            box.appendChild(t)
            box.appendChild(d);
            box.appendChild(deleteBtn)
            //
            container.appendChild(box)
        }
               
        })
    }
}

function cleanHTML(){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}
export { dataList,getZones,createHTML}
