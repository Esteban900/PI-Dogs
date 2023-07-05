
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {

//creo mi estado local

const dispatch = useDispatch();
const [name, setName ] = useState("")

//guardo el input
const inputHandler = (event) => {
    event.preventDefault ();
    setName(event.target.value);

};

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getNameDog(name));
    setName("");
}

return (

    <div>
        <input type="text" placeholder="Search..." value={name}
         onChange={ (e) => inputHandler(e)}
         className={style.input
        }/>
        
        <button type="submit" className={style.buttonSearch} onClick={ e => submitHandler(e)}> Search</button>
    </div>
)
};

export default SearchBar;