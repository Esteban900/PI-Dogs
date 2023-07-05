
const { Dog, Temperament } = require ("../db");

const createDog = async (name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments, createInBd) => {
// console.log("estoy en controllers");
//     console.log(name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments);

name = name.charAt(0).toUpperCase() + name.slice(1);
 // Verificar si el nombre del perro ya existe en la base de datos
 life_span = life_span + " years";
 const existingDog = await Dog.findOne({
    where: { name }
  });

  if (existingDog) {
    return "El nombre del perro ya existe. No se puede crear duplicado.";
  }
  
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