import { useEffect, useState } from "react";
import { postDogs, getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import style from "./Form.module.css";

const validate = (input) => {
    let errors = {};
    let controlName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let controlNumbers = /^[0-9]\d*(\.\d+)?$/;
    var regex = new RegExp("^[0-9-]+$");

    //NAME
     if(!input.name.trim()) {
        errors.name = "Name is required";
     } else if (input.name.length < 3 || input.name.length > 20) {
            errors.name = "The name must have a length between 3 and 20 characters";
     
     } else if (!controlName.test(input.name.trim())){
        errors.name = "The 'Name' field only accepts letters and whitespace"
     }

     //HEIGHT MIN
      else if (!input.height_min ) {
        errors.height_min = "Height minimum is required"

     } 
     else if (!controlNumbers.test(input.height_min.trim()) ) {
        errors.height_min = "Only numbers and positives are required"

     } 
     else if (input.height_min < 5) {
        errors.height_min = "The minimum height should not be less than 5"

     }
     else if (input.height_min > 120) {
        errors.height_min = "The minimum height should not be higher than 120"

     }
     

    //HEIGHT MAX
    else if (!input.height_max ) {
        errors.height_max = "Weight maximun is required"

     } 
     else if (!controlNumbers.test(input.height_max.trim()) ) {
        errors.height_max = "Only numbers and positives are required"

     } 
    
     else if ( parseInt(input.height_min) >= parseInt(input.height_max)) {
        errors.height = " Height min is > Height max"        
     }

    
     else if (input.height_max < 1) {
        errors.height_max = "The minimum height should not be less than 1"
 
    } 

    // WEIGHT MIN
    else if (!input.weight_min ) {
        errors.weight_min = "Weight minimum is required"

     } 
     else if (!controlNumbers.test(input.weight_min.trim()) ) {
        errors.weight_min = "Only numbers and positives are required"

     } 
    else if (input.weight_min < 1) {
       errors.weight_min = "The minimum weight should not be less than 1"

    }
    else if (input.weight_min > 70) {
       errors.weight_min = "The minimum weight should not be higher than 70"

    }
    
   //WHEIGHT MAX
   else if (!input.weight_max ) {
       errors.weight_max = "Height maximun is required"

    } 
    else if (!controlNumbers.test(input.weight_max.trim()) ) {
       errors.weight_max = "Only numbers and positives are required"

    } 
    else if ( parseInt(input.weight_min) >= parseInt(input.weight_max)) {
       errors.weight = " Weight min is > Weight max"        
    }

    else if (input.weight_max < 1) {
        errors.weight_max = "The minimum weight should not be less than 1"
 
    } 

   
    else if (input.weight_max > 70) {
       errors.weight_max = "The maximun weight should not be higher than 70"

    }


    //LIFE SPAN

    else if (!input.life_span) {
        errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
      } else if (!input.life_span.includes("-")) {
        errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
      } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
        errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
      } else if (
        Number(input.life_span.split("-")[0]) >
        Number(input.life_span.split("-")[1])
      ) {
        errors.life_span =
          "The maximum life span must be higher than the minimum life span";
      }
       else if (regex.test(input.life_span) == false) {
        errors.life_span = "Only positive integer numbers!";
      }
       else if (input.life_span.charAt(0) == "-") {
        errors.life_span = "Only positive integer numbers!";
      }
    
     else if (Number(input.life_span.split("-")[0]) < 1 || Number(input.life_span.split("-")[1]) >25) {
        errors.life_span = "Life span is required  > 1 and < 25"

     } 
    else if (!input.temperaments.length) {
        errors.temperaments = "Temperaments is required"

     }
    
     return errors;

    }


const Form = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments);
    const dogs = useSelector((state) => state.dogs);
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        image: "https://www.curn.edu.co/images/ZARINA_2.jpg",
        life_span: "",
        temperaments: []
       
    });

    useEffect( () => {
        dispatch(getTemperaments());
    }, []);

    //cuando aprieto el teclado, necesito una funcion que me modifique el estado: para que ese cambio se vea reflejado en el input

    const changeHandler = (e) => {
        setInput( (previousInput) => ({
            ...previousInput,
            [e.target.name] : e.target.value
        }));
        setErrors((previousError) => ({
            ...previousError,
            [e.target.name] : ""
        }));
    }





    const selectHandler = (e) => {
      

            setInput( (previousInput) => {
                if(!previousInput.temperaments.includes(e.target.value)) {
                    return {
                ...previousInput,
                temperaments: [ ...previousInput.temperaments, e.target.value]
            };
                } return previousInput;
            });
    
    }



    const submitHandler = (e) => {
        e.preventDefault();
        const formErrors = validate(input);
        if( Object.keys(formErrors).length === 0) {
            const aux = input.name.charAt(0).toUpperCase() + input.name.slice(1);
            const existingDog = dogs.find((dog) => dog.name === aux);
      if (existingDog) {
        alert("The dog's name already exists. Can't create duplicate.");
      } else {
            dispatch(postDogs(input))
            alert("Successfully created dog!!")
            setInput( {
                name: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                image: "https://www.curn.edu.co/images/ZARINA_2.jpg",
                life_span: "",
                temperaments: []
            });
            history.push("/home");
        }
        } else { 
            setErrors(formErrors);
        }
    };

    

    const deleteHandler = (el) => {
        setInput( (previousInput) => ( {
            ...previousInput,
            temperaments: previousInput.temperaments.filter( temp => temp !== el)
        }))
    }

    return (
        /*name
        height (diferenciar entre altura min y max)
        weight (diferenciar entre altura min y max)
        life_span
        temperaments----> select
        button---> crear
        
        */
    <div className={style.addDogs}>

            <h1 className={style.msg}>Creat your Dogs!</h1>
        <form onSubmit={ (e) => submitHandler(e)}>

            <div className={style.nameInput}>
                <label className={style.msgs}>Name:</label>
                <input className={style.inputs} type="text" placeholder="Name" value={input.name} onChange={(e) => changeHandler(e)} name ="name"/>
                {errors.name && (
                        <p className={style.errors}>{errors.name}</p>
                    )}
            </div>
 
            <div>

            {/* height_min */}
            <div className={style.nameInput}>
                <label className={style.msgs}>Height min:</label>
                <input className={style.inputs} type="text" placeholder=" min: 5 - max: 120" value={input.height_min} onChange={(e) => changeHandler(e)} name ="height_min"/>
                {errors.height_min && (
                    <p className={style.errors}>{errors.height_min}</p>
                    )}
            </div>

            {/* height_max */}
            <div className={style.nameInput}>
                <label className={style.msgs}>Height max:</label>
                <input className={style.inputs} type="text" placeholder=" min: 6 - max: 120" value={input.height_max} onChange={(e) => changeHandler(e)} name ="height_max"/>
                {errors.height_max && (
                    <p className={style.errors}>{errors.height_max}</p>
                    )}
            </div>
            {errors.height && (
                    <p className={style.errors}>{errors.height}</p>
                    )}
            </div>


            {/* weight_min */}

            <div>

            <div className={style.nameInput}>
                <label className={style.msgs}>Weight min:</label>
                <input className={style.inputs} type="text" placeholder=" min: 1 - max: 70" value={input.weight_min} onChange={(e) => changeHandler(e)} name ="weight_min"/>
                {errors.weight_min && (
                        <p className={style.errors}>{errors.weight_min}</p>
                    )}
            </div>

            {/* weight_max */}
            <div className={style.nameInput}>
                <label className={style.msgs}>Weight max:</label>
                <input className={style.inputs} type="text" placeholder=" min: 2 - max: 70" value={input.weight_max} onChange={(e) => changeHandler(e)} name ="weight_max" />
                {errors.weight_max && (
                        <p className={style.errors}>{errors.weight_max}</p>
                    )}
            </div>
            {errors.weight && (
                        <p className={style.errors}>{errors.weight}</p>
                    )}

            </div>

            {/* life_span */}
            <div className={style.nameInput}>
                <label className={style.msgs}>Life Span:</label>
                <input className={style.inputs} type="text" placeholder=" 1-25" value={input.life_span} onChange={(e) => changeHandler(e)} name ="life_span"/>
                {errors.life_span && (
                        <p className={style.errors}>{errors.life_span}</p>
                    )}
            </div>

           
            {/* image */}
            <div className={style.nameInput}>
                <label className={style.msgs}>Image:</label>
                <input className={style.inputs} type="text" value={input.image} onChange={(e) => changeHandler(e)} name="image"/>
            </div>


    {/* TEMPERAMENT */}

            <div >
                <label className={style.msgs}> Temperament Types:</label>
                <div className={style.msgs}>
                <select className={style.checks} onChange={ (e) => selectHandler(e)}>
                    { temperaments.map((temp) => {
                        return (
                            <option key={temp.name} value={temp.name}>{temp.name}</option>
                        )
                    })}
                  
                </select>
                <div>
                     {errors.temperaments && (
                        <p className={style.errors}>{errors.temperaments}</p>
                    )} </div>
                </div>
                {/* <ul className={style.divTem}><li>{input.temperaments.map( el => el + " ,")}</li></ul> */}
            </div>
<br></br>
     {/* <ul className={style.ul}>
       {input.temperaments.map( (el, index) => (
        <li key={index}>
           {el}  <button className="botonX" onClick={ () => deleteHandler(el)}>x</button></li>

        
       ) )}
    </ul> */}
    {input.temperaments.map( el => 
            <div className={style.divTem} key={el} >
                <ul>{el}  <button className={style.buttonX} onClick={()=> deleteHandler(el)}>x</button></ul>
               
            </div>
            )}
    <div>
        <button className={style.submitButton} type="submit" >Crear Dogs</button>
        </div>
        </form>
       
        
       
    </div>
    )
};

export default Form;