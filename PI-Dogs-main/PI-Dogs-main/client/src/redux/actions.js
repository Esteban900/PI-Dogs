import axios from "axios";

 export const GET_DOGS_ALL = "GET_DOGS_ALL";
 export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
 export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
 export const GET_NAME_DOGS = "GET_NAME_DOGS";
 export const FILTER_BY_NAME = "FILTER_BY_NAME";
 export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
 export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
 export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
 export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
 export const CLEAR_DETAIL = "CLEAR_DETAIL";

 //ALLDOGS
export const getDogsAll = () => {
    
    return async function (dispatch) {
    try {
            const dataDogs = await axios.get("http://localhost:3001/dogs");
    
            const dogsData = dataDogs.data;
            return dispatch({
                type: GET_DOGS_ALL,
                payload: dogsData
            });
            
        } catch (error) {
            alert(error.message)
        }
    };
};


//DETAIL (ID)
export const getDogsDetail = (id) => {

    return async function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/dogs/${id}`);

        const dogId = apiData.data;
        dispatch({
            type: GET_DOG_DETAIL,
            payload: dogId
        });
    };

};


//TEMPERAMENTS
export const getTemperaments = () => {
    return async function (dispatch) { //si no funciona es con var el llamado a axios
        const infoTemperaments = await axios.get("http://localhost:3001/temperaments")

        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: infoTemperaments.data
        })
    }
};

//POST
export const postDogs = (payload) => {
 
    return async function (dispatch) {

        const response = await axios.post("http://localhost:3001/dogs", payload);
        
        return response;
    }
};

export const getNameDog = (name) => {
   
    return async function (dispatch) {
        try {
            const nameData = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        
            return dispatch( {
                type: GET_NAME_DOGS,
                payload:nameData.data
            })
            
        } catch (error) {
            return alert("raza no encontrada")
            
        }
    }
};

export const searchBarName = (payload) => {
    return {
        type: FILTER_BY_NAME,
        payload: payload
    }
};



//FILTER TEMPERAMENTS
export const getFilterByTemperaments = (payload) => {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload: payload
    }
};


//FILTER CREATED
export const filterCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload: payload
    }
}

//FILTER BY ORDER
export const getFilterByOrder = (payload) => {
    return {
        type: FILTER_BY_ORDER,
        payload: payload
    }
}

//FILTER BY HEIGHT
export const orderByWeight = (payload) => {
    return {
        type: FILTER_BY_WEIGHT,
        payload: payload
    }
}

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
    }
}