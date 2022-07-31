const fs = require('fs');

const axios = require('axios');

class Busquedas{
    historial = [];
    dbPath = './db/database.json';
    
    constructor(){
        this.leerDB();
    }
    
    
    get historialCammelCase(){
        return this.historial.map( (lugar) => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
    }

    get paramsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language':'es'
        }
    }

    get paramsWeather(){
        return{
            'units': "metric",
            'lang': "es",
            'appid': process.env.OPENWEATHER_KEY
        }
    }


    async buscarCiudad( lugar = '') {
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params:this.paramsMapbox
            });
            
            const answer = await instance.get();
            
            return (answer.data.features.map( lugar => ({
                id: lugar.id, nombre: lugar.place_name, lng: lugar.center[0], lat: lugar.center[1]}
                )));
        }catch (error){

        }
       
    }

    async buscarClimaPorLugar ( lat=0, lng=0 ) {
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsWeather,
                    'lat': lat,
                    'lon': lng
                }
            });

            const answer = await instance.get();
            const { weather, main } = answer.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
                hum: main.humidity
            };

        }catch(error){
            console.log(error)
        }
    }

    agregarHistorial ( lugar = ''){

        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if( !fs.existsSync( this.dbPath ) ) return;

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' },
        function(err, data) {
            if(err)
                console.log(err);
            else
                console.log(data);});

        const data = JSON.parse(info);
        
        this.historial = data.historial;
    }
}

module.exports = Busquedas;