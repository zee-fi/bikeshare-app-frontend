import { useContext } from "react";
import { BikeContext } from "../context/bike.context";
import { Link } from "react-router-dom";

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
      {bikes.map((bike) => {
        return (
          <div key={bike.id}>
            <h2>{bike.title}</h2>
            <p>{bike.description}</p>
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
            <p>{bike.price}</p>
            <button>See Full Details</button>
            <button><Link to={`/booking/${bike.id}`}>Reserve Now</Link></button>
          </div>
        );
      })}
    </>
  );
}
