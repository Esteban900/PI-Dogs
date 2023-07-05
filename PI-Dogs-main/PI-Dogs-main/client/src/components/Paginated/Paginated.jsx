import React from "react";
import style from "./Paginated.module.css";

export default function Paginated( {dogsPerPage, dogsAll, Page, currentPage}){
    const pageNumbers = []

    for( let i = 1 ; i <= Math.ceil(dogsAll/dogsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>

        <nav>
            <ul>
                {pageNumbers && pageNumbers?.map(number => (
                    <button key= {number}
                    onClick={ () => Page(number)} className={`${style.buttonNumber} ${number === currentPage ? style.active:''}`}>
                        {number} 
                    </button>
                    ))}
            </ul>
        </nav>
                    </div>

    )
}