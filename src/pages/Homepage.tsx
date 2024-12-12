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
            <h2>Discover and share bikes in Berlin with ease. Our platform lets you find available bikes for rent around the city, or list your own bike to earn extra income. Whether you're looking to explore Berlin on two wheels or share your ride with others, our community-driven bikeshare service makes it simple and convenient.</h2>
        </div>
        <div>
            <button><Link to="/bikes">Rent a bicycle</Link></button>
            <button><Link to="/addBike">Add your bicycle</Link></button>
        </div>
        </div>
        </div>
        </>
    )
}