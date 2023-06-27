const { getAllDogs } = require ("./infoController");



// GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.



// 📍 GET | /dogs/name?="..."
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const getSearchDogByName = async (name) => {

    console.log(name);

    const allDogs = await getAllDogs();

    const dogName = allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
  
    return (dogName.length)? dogName : `The ${name} dog does not exist`;

};




// 📍 GET | /dogs/:idRaza
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

const getDogById = async (id) => {

console.log("id", id);

const infoDogs =  await getAllDogs();

const filterById = infoDogs.filter((dog) => dog.id == id);

if(filterById.length > 0) {
    return filterById[0];
} else {
    return `ID dog not found, ID = ${id}`;
}


};

module.exports = { getSearchDogByName, getDogById}