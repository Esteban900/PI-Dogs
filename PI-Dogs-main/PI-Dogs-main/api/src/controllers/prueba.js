// const getDbInfo = async () => {

//     const dogsBd = await Dog.findAll({
//         include: {
//             model: Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         },
        
//     });

//     const response = dogsBd?.map( dogui => {
//         const temperaments = dogui.Temperaments.map(temperament => temperament.name);
//         console.log("dogui", temperaments);
//         return {
//             id: dogui.id,
//             name: dogui.name,
//             image: dogui.image,
            
//             life_span: dogui.life_span,
//             height_min: dogui.height_min,
//             height_max: dogui.height_max,
//             weight_min: dogui.weight_min,
//             weight_max: dogui.weight_max,
//             temperament: temperaments,
//             createInBd: dogui.createInBd,
//         }
//     });
    
//     return response;
  
// }