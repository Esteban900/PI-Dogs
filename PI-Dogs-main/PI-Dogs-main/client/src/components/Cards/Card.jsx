import style from "./Card.module.css";

import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <div className={ style.Card}>
            {/* <p className={ style.title}>id: {props.id}</p> */}
            <Link to={`/detail/${props.id}`}>
            <h2 className={ style.title}>{props.name}</h2>
            </Link>
            <img src={props.image} alt="img not found" className={ style.cardImage}/>
            <p className={ style.text}> Weight: {props.weight_min}kg - {props.weight_max}kg</p>
            {/* <p className={ style.title}> weight max: {props.weight_max}</p> */}
            {/* <h3 className={style.text}>Temperament: </h3> */}
            <p className={ style.text}>{props.temperament.join(", ")}</p>
        
        </div>
    )
};

export default Card;