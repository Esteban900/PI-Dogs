
const { getAllDogs } = require ("../controllers/infoController");
const {Temperament }= require ("../db");

const temperamentAll = async () => {

    const temperamentData = await getAllDogs();

    for ( const el of temperamentData ) {
        
        if(String(el.temperament) !== "Not temperament") {
            
            let listTemperament = el.temperament; 
    

            for ( const elem of listTemperament) {

                await Temperament.findOrCreate({
                    where: {name: elem}
                })
            }
        }
    }
    const allTemperament = await Temperament.findAll();
    return allTemperament;
};

module.exports= { temperamentAll }