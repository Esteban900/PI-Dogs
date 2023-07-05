import Card from "../Cards/Card";
import style from "./CardsContainer.module.css";


const CardsContainer = ( {currentDogs}) => {

    if(!Array.isArray(currentDogs)) {
        return <div className={style.text}> No se encontraron perros</div>
    }

    return(
        <div className= {style.container}>
            { currentDogs.map( (dog) => {
                return(
                <div key={dog.id} className={style.divCard}>
                <Card
                id = { dog.id }
                name = { dog.name }
                image = { dog.image }
                // height_min = { dog.height_min }
                // height_max = { dog.height_max }
                weight_min = { dog.weight_min }
                weight_max = { dog.weight_max }
                // life_span = { dog.life_span }
                temperament = { dog.temperament }  
                                
                />
                </div>)
            })}
        </div>
    )
}

export default CardsContainer;