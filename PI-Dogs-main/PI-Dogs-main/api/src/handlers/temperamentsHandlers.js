
const { temperamentAll } = require ("../controllers/temperamentController");


const getTemperamentsHandler = async (req,res) => {
   
    try {
        const allTemperament = await temperamentAll();
        res.status(200).json(allTemperament);

    } catch (error) {
        res.status(400).json({ error: error.message});
    }

};

module.exports = { getTemperamentsHandler }