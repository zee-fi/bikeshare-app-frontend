import { NavLink } from "react-router-dom";
import "../css/navbar.css";



export default function Header () {
    return (
        <>
        <nav className="nav">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/bikes">Bikes</NavLink></li>
                <li><NavLink to="/addBike">Add your Bike</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
        </>
    )
}