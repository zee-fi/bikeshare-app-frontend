import "../index.css";
import { Link } from "react-router-dom";

export default function Homepage () {

    return (
        <>
        <div className="main-content">
        <div className="main-div">
        <img src="../public/bike.png" className="hp-img" alt="bike drawing"/>
        <h1>Bikesharing in Berlin</h1>
        <div>
            <button><Link to="/bikes">Rent a bicycle</Link></button>
            <button><Link to="/addBike">Add your bicycle</Link></button>
        </div>
        </div>
        </div>
        </>
    )
}