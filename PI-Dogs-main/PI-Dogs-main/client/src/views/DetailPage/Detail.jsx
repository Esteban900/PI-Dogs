import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDogsDetail, clearDetail } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import style from "./Detail.module.css";

const Detail = () => {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getDogsDetail(params.id))
        return() => {
          dispatch(clearDetail())
        }
    }, [dispatch, params.id])

    const dogDetail = useSelector ((state) => state.detail)

    return (
    <div>  
        <br></br>
    {/* <br></br> */}
    <h1 className={style.Name}>{dogDetail.name}</h1>
    <h2 className={style.Value}>ID: {dogDetail.id}</h2>
        <div className={style.Data} >
  <div style={{ flex: "1" }}>
   
    <div className={style.Container}>
      <h2 className={style.Title}>Height</h2>
      <h3 className={style.Value}>
        {dogDetail.height_min} cm - {dogDetail.height_max} cm
      </h3>
    </div>

    <div className={style.Container}>
      <h2 className={style.Title}>Weight</h2>
      <h3 className={style.Value}>
        {dogDetail.weight_min} kg - {dogDetail.weight_max} kg
      </h3>
    </div>

    <div className={style.Container}>
      <h2 className={style.Title}>Life Span</h2>
      <h2 className={style.Value}>{dogDetail.life_span}</h2>
    </div>

    <div className={style.ContainerTemperament}>
      <h2 className={style.Title}>Temperament</h2>
      <ul>
        {Array.isArray(dogDetail.temperament) ? (
          dogDetail.temperament.map((temp, index) => {
            return (
              <li className={style.divTem} key={index}>
                {temp}
              </li>
            );
          })
        ) : (
          <li className={style.Temperament}>{dogDetail.temperament}</li>
        )}
      </ul>
    </div>
  </div>
  <div>
    <img src={dogDetail.image} alt="Pic not found" className={style.image} />
  </div>
</div>
</div>
    //    <div className={style.Data}>
    //         <br></br>
    //         <br></br>
    //             {/* <h2>{dogDetail.id}</h2> */}
    //             <h1 className={style.Title}>{dogDetail.name}</h1>
               
    //                <div>
    //                <h2 className={style.Title}>Weight</h2>
    //                    <h3 className={style.Value}>{dogDetail.height_min} cm - {dogDetail.height_max} cm</h3>
    //                    {/* <h3>Height max: </h3> */}
    //                 </div>
    //                 <div>
    //                     <h2 className={style.Title}>Weight</h2>
    //                   <h3 className={style.Value}>{dogDetail.weight_min} kg - {dogDetail.weight_max} kg</h3>
    //                   {/* <h3>Weight max: </h3> */}
    //                 </div>

    //                 <div>
    //                 <h2 className={style.Title}>Life Span</h2>
    //                     <h2 className={style.Value}>{dogDetail.life_span}</h2>
    //                 </div>

    //             <div>
    //                 <img src={dogDetail.image} alt = "Pic not found" className={style.image}/>
    //             </div>

    //             <div>
    //                 <h2 className={style.TitleTemperament}>Temperament: </h2>

    //                   <ul> { Array.isArray(dogDetail.temperament) ? dogDetail.temperament.map((temp, index) => {
    //                         return (
    //                             <li className={style.Temperament} key={index}>
    //                                 {temp}
    //                             </li>
    //                         )
    //                    }) : <li>{dogDetail.temperament}</li>
                        
    //                     } 
                       
                            
    //                     </ul>

    //             </div>

    //    </div>
    )
};

export default Detail;