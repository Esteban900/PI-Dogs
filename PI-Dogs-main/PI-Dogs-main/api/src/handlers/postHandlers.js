
const { createDog } = require ("../controllers/postController");

const createDogsHandler = async (req,res) => {
    
    const { name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments, createInBd } = req.body;

    try {
        
        if( !name || !image || !height_min || !height_max || !weight_min || !weight_max || !life_span || !temperaments.length) return res.status(400).json("Falta informacion");

        const newDog = await createDog (name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments, createInBd);
        return res.status(201).json( newDog );

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

module.exports = { createDogsHandler}