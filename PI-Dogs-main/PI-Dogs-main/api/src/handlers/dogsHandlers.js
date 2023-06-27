const { getAllDogs } = require("../controllers/infoController");

const { getSearchDogByName, getDogById } = require ("../controllers/dogsController");



//BUSQUEDA DE DOGS POR NAME / TODOS

const getDogsHandler = async (req,res) => {
    const { name } = req.query;
    
    const results = (name) ? await getSearchDogByName(name) : await getAllDogs();
try {
    res.status(200).json(results);
    
} catch (error) {
    res.status(400).json({ error: error.message });
}
}


//BUSQUEDA POR ID
const getIdDogsHandler = async (req,res) => {
    const { id } = req.params;
   
    //const sourse = isNaN(id) ? "bdd" : "api";

    try {
        
        const dogByid = await getDogById(id);
        res.status(200).json(dogByid);


    } catch (error) {
        res.status(400).json({ error: error.message});
    }

}



module.exports = { getDogsHandler, getIdDogsHandler}