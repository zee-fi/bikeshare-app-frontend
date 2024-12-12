import "../css/footer.css";
import { NavLink } from "react-router-dom";

export default function Footer () {

    return(
        <>
        <ul className="footer">
            <li><NavLink to="/about">About</NavLink></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/fiona-hulse/">LinkedIn</a></li>
            <li><a target="_blank" href="https://github.com/zee-fi">GitHub</a></li>
        </ul>
        </>
    )

}