const { Dog, Temperament } = require ("../db");
const axios = require ("axios");


//LLAMADO A API

const getApiInfo =  async () => {

    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiData = apiUrl.data;
    
    
    const apiInfoDetail = await apiData.map( (el) => {
        return {
            id: el.id,
            name: el.name,
            image: el.image.url,
            breed_group: el.breed_group,
            // height: el.height.metric,   //quitar esto
            // weight: el.weight.metric,   //quitar esto
            height_min: parseInt(el.height.metric.split("-")[0]),
            height_max: parseInt( el.height.metric.split("-")[1]),
            weight_min: parseInt( el.weight.metric.split("-")[0]),
            weight_max: parseInt( el.weight.metric.split("-")[1]),
            life_span: el.life_span,

            temperament: el.temperament ? el.temperament.split(", ") : ["Not temperament"],
        }
    });

    return apiInfoDetail;

};

//FIN LLAMADO API


//LLAMADO BASE DE DATOS


const getDbInfo = async () => {
    const dogsBd = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },

    });

    let response = await dogsBd?.map( dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height_min: dog.height_min,
            height_max: dog.height_max,
            weight_min: dog.weight_min,
            weight_max: dog.weight_max,
            life_span: dog.life_span,
            temperament: dog.temperaments?.map(temperament => temperament.name),
            createInBd : dog.createInBd,
        }
    });
    return response;

}


//FIN LLAMADO A API

//UNION API-BD
const getAllDogs = async() => {
    const dbInfo = await getDbInfo();
    const apiInfo = await getApiInfo();
    return [...dbInfo, ...apiInfo];
}

module.exports = { getAllDogs }

