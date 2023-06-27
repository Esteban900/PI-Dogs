
const { Dog, Temperament } = require ("../db");

const createDog = async (name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments, createInBd) => {
console.log("estoy en controllers");
    console.log(name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments);

const newDog = await Dog.create({
    name,
    image,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    temperaments,
    createInBd
});

    const temperamentBd = await Temperament.findAll({
        where: { name: temperaments}
    })

    newDog.addTemperament(temperamentBd);
    return "Dogs creado con exito";

};

module.exports = { createDog }