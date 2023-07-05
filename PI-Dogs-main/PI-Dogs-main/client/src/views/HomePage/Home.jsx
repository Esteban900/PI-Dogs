import CardsContainer from "../../components/CardsContainer/CardsContainer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsAll, getTemperaments } from "../../redux/actions";

import SearchBar from "../../components/SearchBar/SearchBar";
import Paginated from "../../components/Paginated/Paginated";
import FilterOption from "../../components/FilterOption/FilterOption";

import style from "./Home.module.css";

const Home = () => {

const dispatch = useDispatch();

const dogsAll = useSelector((state) => state.dogs);
const temperamentsAll = useSelector((state) => state.temperaments);

const [order, setOrder] = useState("")
const [currentPage, setCurrentPage] = useState(1)
const [ dogsPerPage, setDogsPerPage ] = useState(8)

const indexLastDogs = currentPage * dogsPerPage;
const indexFirstDogs = indexLastDogs - dogsPerPage;
const currentDogs = dogsAll.slice( indexFirstDogs, indexLastDogs)

const Page = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect( () => {
    dispatch(getDogsAll());
}, [dispatch])


useEffect( () => {
    dispatch(getTemperaments())
},[dispatch])


    return (
        <div className={style.contHome}>
       <br></br>
       <br></br>
       <div className={style.intro}>
       <br></br>
           <SearchBar/>
       {/* <div> */}
          
        <FilterOption temperamentsAll={temperamentsAll} setCurrentPage={setCurrentPage} setOrder={setOrder}></FilterOption>
       <Paginated 
       dogsPerPage={ dogsPerPage }
       dogsAll={ dogsAll.length }
       Page={ Page }
       currentPage= {currentPage} 
       />
      </div>
        <CardsContainer currentDogs = {currentDogs} />
       
       
       {/* </div> */}
       
       
       
        </div>
    )
};

export default Home;