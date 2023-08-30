import { getFilterByTemperaments, filterCreated, getFilterByOrder, orderByWeight } from "../../redux/actions";
import { useDispatch } from "react-redux";

import style from "./FilterOption.module.css";


const FilterOption = ( { temperamentsAll, setCurrentPage, setOrder} ) => {
    const dispatch = useDispatch();


 const handlerFilterByTemperaments = (event) => {
    dispatch(getFilterByTemperaments(event.target.value));
    setCurrentPage(1);
    setOrder(`${event.target.value}`)
}

const handlerFilterById = (event) => {
    event.preventDefault();
    dispatch(filterCreated(event.target.value))

}


const handlerFilterByOrder = (event) => {
    event.preventDefault();
    dispatch(getFilterByOrder(event.target.value));
    setCurrentPage(1);
    setOrder(`${event.target.value}`)
}

const handlerFilterByWeight = (event) => {
    event.preventDefault();
    dispatch(orderByWeight(event.target.value))
    setCurrentPage(1);
    setOrder(`${event.target.value}`)
}


    return (
        <>
            <>
                <select defaultValue="Filter by Id" onChange={ e => handlerFilterById(e)} className={style.checks}>
                    <option>Filter By Id</option>
                    
                    <option key = "All" value = "All">All Dogs</option>
                    <option key = "Created" value = "Created">Dogs create BDD</option>
                    <option key = "apiId" value = "apiId">Api Dogs</option>
                </select>
            </> 
        

            <>
                <select defaultValue="Filter by type" onChange={ e => handlerFilterByTemperaments(e)} className={style.checks}>

                <option>Filter by type: </option>
                {temperamentsAll?.map( (temps) => <option key={temps.name} value={temps.name}> {temps.name}
                </option>)}
                </select>
            
            
            </>


            <>
            <select defaultValue="Order by weight" onChange={ ev => handlerFilterByWeight(ev)} className={style.checks}>
                <option>Order by weight max</option>
                <option key="asc" value="Ascending">Ascending</option>
                <option key="des" value="Descending">Descending</option>
            </select>
            </>

            <>
            <select defaultValue="Order by name" onChange={ ev => handlerFilterByOrder(ev)} className={style.checks}>
                <option>Order by Name</option>
                <option key="asc" value="Ascending">Ascending</option>
                <option key="des" value="Descending">Descending</option>
            </select>
            </>
        
        </>
    )
};

export default FilterOption;