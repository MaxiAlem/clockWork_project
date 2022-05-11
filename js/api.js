


const container = document.querySelector('#container');//traer aca los values del time
const zoneList = document.querySelector('#zoneList');
    // GET /timezones -> Obtiene todos los timezones.
    // GET /timezones/:name -> Obtiene un timezone específico.
    // PUT /timezones/:name -> Agrega un timezone específico al usuario.
    // DELETE /timezones/:name -> Elimina un timezone específico del usuario.


const url = `http://worldtimeapi.org/api/timezone/`;
let timezones = []



async function dataList(){ //get a cada zona

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

async function consultApi(){//get timezone especifico

    let search = document.querySelector('#search').value;

    try {
        const res = await fetch(`${url}${search}`);
        const data = await res.json()
        time(data)
    } catch (error) {
        console.log(error)
    }

}



function time(data){
    const {timezone, datetime} = data

    //si cortamos el time offset, new Date(datetime) no nos devuelve nuestra hora local
    let datetimeFix = datetime.slice(0, -6)
   
    const dateFix = (datetimeFix =>{
        const newDate = new Date(datetimeFix)
        return new Intl.DateTimeFormat('es-AR', {dateStyle: 'medium'}).format(newDate)
    })
    const timeFix = (datetime =>{
        const newTime = new Date(datetime)
        return new Intl.DateTimeFormat('es-AR', {timeStyle: 'medium'}).format(newTime)
    })

    const  newTimeObj = {
        timezone,
        date:dateFix(datetime),
        time: timeFix(datetime)
        };
    function saveLocalSt(){
        localStorage.setItem('timezones', JSON.stringify(timezones));
    }
    
    console.log(newTimeObj)
    timezones = [...timezones, newTimeObj]
    saveLocalSt()//desps de cargar el nuevo value al array, lo enviamos al LS
    //console.log(timezones)
}
function submitForm(e){
    e.preventDefault()
    consultApi();

//crear HTML
}
function retrieveData(){
    timezones = JSON.parse(localStorage.getItem('timezones'))
    console.log
    if(timezones.length > 0){
        timezones.forEach(zone =>{
            const box = document.createElement('div')

            const timezone =document.createElement('h2');
            timezone.innerHTML = `${zone.timezone}`
            const date =document.createElement('h4');
            date.innerHTML = `${zone.date}`
            const time =document.createElement('h4');
            time.innerHTML = `${zone.time}`

            const deleteBtn=document.createElement('a')
            deleteBtn.textContent= 'X'


            box.appendChild(timezone);
            box.appendChild(date);
            box.appendChild(time);
            box.appendChild(deleteBtn)
            //
            container.appendChild(box)


        })
    }
    //createHTML()
}

export { dataList, submitForm, retrieveData}
