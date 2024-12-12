import { useContext } from "react";
import { BikeContext } from "../context/bike.context";
import { Link } from "react-router-dom";
import "../css/bikelist.css";
import "../index.css";

export default function Bikelist() {
  const bikeContext = useContext(BikeContext);

  if (!bikeContext) {
    throw new Error("BikeContext is not provided. Please wrap your components in BikeProvider.");
  }

  const { bikes, loading } = bikeContext;

  if (loading) {
    return <p>Loading bikes...</p>
  }

  if (!Array.isArray(bikes)) {
    return <p>Error: bikes data is not an array</p>
  }

  return (
    <>
      <div className="bike-card-container">
        {bikes.map((bike) => {
          return (
            <div className="bike-card" key={bike.id}>
              <h2>{bike.title}</h2>
              <img src={bike.image} alt={`Image of ${bike.title}`} />
              <ul>
                {bike.tags && bike.tags.length > 0 ? (
                  bike.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))
                ) : (
                  <li>No tags available</li>
                )}
              </ul>
              <p className="price">€{bike.price} per day</p>
              <button><Link to={`/bikes/${bike.id}`}>See Full Details</Link></button>
              <button className="reserve-button">
                <Link to={`/bookings/${bike.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                  Reserve Now
                </Link>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
  
}
