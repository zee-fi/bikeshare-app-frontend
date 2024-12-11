import { useContext } from "react";
import { BikeContext } from "../context/bike.context";

export default function Bikelist() {
  const {bikes, loading } = useContext(BikeContext);

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
            <p>{bike.tags}</p>
            <p>{bike.price}</p>
            <button>See Full Details</button>
            <button>Reserve Now</button>
          </div>
        );
      })}
    </>
  );
}
