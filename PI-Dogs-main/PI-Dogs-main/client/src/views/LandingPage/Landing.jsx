import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Landing.module.css";
const Landing = () => {

    return (
        <div className={style.Landing}>
        <h1 className={style.h1}>Welcome to Henry's Dogs</h1>
        <Link to="/home" > <button className={style.link}>Get into</button></Link>
        </div>
    )
};

export default Landing;