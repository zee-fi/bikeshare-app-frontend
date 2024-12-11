import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BikeContext } from "../context/bike.context";
import { BikeType } from "../types";

export default function Bike (){
    const {bikeId} = useParams();
    const bikeContext = useContext(BikeContext);
    if (!bikeContext) {
      throw new Error("BikeContext is not provided. Please wrap your components in BikeProvider.");
    }

    const { getBikeById } = bikeContext;
    const [bike, setBike] = useState<BikeType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBike = async () => {
          if (!bikeId) {
            console.log("Bike Id is undefined");
            setLoading(false);
            return;
          }

          try {
            const bikeData = await getBikeById(Promise.resolve(bikeId)); 
            setBike(bikeData || null); 
          } catch (err) {
            console.error("Error fetching bike details", err);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchBike();
      }, [bikeId, getBikeById]); 
    
      if (loading) {
        return <p>Loading bike details...</p>;
      }
    
      if (!bike) {
        return <p>Bike not found!</p>; 
      }

    return(
        <div className="bike-details">
            <h2>{bike.title}</h2>
            <img src={bike.image} alt={`Image of ${bike.title}`} />
            <p>{bike.description}</p>
            <div>
        <strong>Tags:</strong>{" "}
        {bike.tags.map((tag, index) => (
          <span key={index}>{tag} </span>
        ))}
      </div>
      <p>
        <strong>Price per day:</strong> ${bike.price}
      </p>
      <p>
        <strong>Deposit:</strong> ${bike.deposit}
      </p>
      <p>
        <strong>Contact Owner:</strong>
      </p>
      <button>Reserve Now</button>
    </div>
    )
}

