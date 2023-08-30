import { GET_DOGS_ALL, GET_DOG_DETAIL, GET_TEMPERAMENTS, GET_NAME_DOGS, FILTER_BY_NAME, FILTER_BY_TEMPERAMENTS, FILTER_BY_CREATED, FILTER_BY_WEIGHT, FILTER_BY_ORDER } from "./actions";


const initialState = {
    dogs: [],
    allDogs:[],
    detail: [],
    temperaments:[],
    filterDogs: []
};


const rootReducer = (state = initialState, action ) => {


    switch( action.type ) {

        case GET_DOGS_ALL:
            return {...state,
             dogs: action.payload,
            allDogs: action.payload,
            filterDogs: action.payload,
            
     };

        case GET_DOG_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case "POST_CREATE_DOGS":
            return {
                ...state,
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case GET_NAME_DOGS:
            // const addDog = state.allDogs;
            return {
                ...state,
                dogs: action.payload,
                // allDogs: addDog

            }

        case FILTER_BY_NAME:
            const filtSearch = state.allDogs;
            const filtState = filtSearch.filter((dog) => {
                let name = dog.name.toLowerCase();
                return name.includes(action.payload);
            })
            return {
                ...state,
                dogs: filtState
            }

        case FILTER_BY_TEMPERAMENTS:
            const dogs_all = state.allDogs;
           
                        
            const filterByTemperaments = action.payload === 'Filter by type:' ? state.allDogs : dogs_all.filter( dog => {
               
                const tempArray = Array.isArray(dog.temperament) ? dog.temperament : [dog.temperament];
               
                if(tempArray.length > 0) {
                    if(tempArray.find( elem => elem === action.payload)) {

                        return dog
                    }
                   
                } return null;
              
            })
            return {
                ...state,
                dogs: filterByTemperaments,
                filterDogs: filterByTemperaments
            }


                     



        case FILTER_BY_CREATED:
        const allDogsCreated = state.allDogs;
        const createFilter = action.payload === "Created" ? allDogsCreated.filter( el => el.createInBd === true) : allDogsCreated.filter( el => !el.createInBd === true);
        return {
            ...state,
            dogs: action.payload === "All" ? allDogsCreated : createFilter
        }


        case FILTER_BY_ORDER:

        let dogsbyOrder;
        if(action.payload === "Ascending") {
            dogsbyOrder = [ ...state.filterDogs].sort((a,b) => {
                if(a.name > b.name) return 1;
                else return -1;
            })
        } else {
            dogsbyOrder = [...state.filterDogs].sort((a,b) => {
                if(a.name < b.name) return 1;
                else return -1;
            });
        }
        return {
            ...state,
            dogs: dogsbyOrder
        }


        case FILTER_BY_WEIGHT:
            let weightDogs;
            
            if(action.payload === "Ascending") {
                weightDogs = [...state.filterDogs].sort((a,b) => a.weight_max - b.weight_max);
            } else {
                weightDogs = [ ...state.filterDogs].sort((a,b) => b.weight_max - a.weight_max);
            }

            return {
                ...state,
                dogs: weightDogs
            }




        default:
            return { ...state };
    }

};

export default rootReducer;