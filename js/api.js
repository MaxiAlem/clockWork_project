import { deleteZone, updateLS } from "../index.js";   

  
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
            return new Intl.DateTimeFormat('en', {dateStyle: 'short'}).format(newDate)
            })
        const timeFix = (datetimeFix =>{
            const newTime = new Date(datetimeFix)
            return new Intl.DateTimeFormat('en', {
                hour: "2-digit",
                minute: "2-digit",
                hour12:true
              }).format(newTime)     
             }) 
 
            //genHTML
            const box = document.createElement('div');
            box.className = ' mw50 col border border-4 rounded-3 d-flex flex-column m-2 '
            
            const z =document.createElement('h2');
            z.className= 'fs-1 text-wrap'
            z.innerHTML = `${timezone}`;

            const t =document.createElement('p');
            t.className = 'fs-3'   
            t.innerHTML = `${timeFix(datetimeFix)}`; 
            
            
            const d =document.createElement('p');
            d.className= 'fs-3'
            d.innerHTML = `${dateFix(datetimeFix)}`;

            const deleteBtn=document.createElement('a')
            deleteBtn.textContent= 'X'
        //     deleteBtn.innerHTML= `
        //     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //     <circle cx="12" cy="12" r="9" />
        //     <path d="M10 10l4 4m0 -4l-4 4" />
        //   </svg>`
           deleteBtn.className=' text-end text-danger text-decoration-none fw-bolder fs-2'
        //deleteBtn.className ='position-relative top-0 start-100'
            deleteBtn.onclick=()=>{
            deleteZone(zone)
            }
            
            box.appendChild(deleteBtn)
            box.appendChild(z);
            box.appendChild(d);
            box.appendChild(t);
            //
            container.appendChild(box)
        }
        })
    }
    updateLS()
}

function cleanHTML(){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}

export { dataList,getZones,createHTML}




