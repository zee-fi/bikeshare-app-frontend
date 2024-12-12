import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookingContext } from "../context/booking.context";
import { BikeContext } from "../context/bike.context";
import { BookingType } from "../types";

export default function BookingForm() {
  const { bikeId } = useParams<{ bikeId: string }>();
  const [bike, setBike] = useState<any>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const bikeContext = useContext(BikeContext);
  const bookingContext = useContext(BookingContext);
  const navigate = useNavigate();

  if (!bikeContext) {
    throw new Error(
      "BikeContext is not provided. Please wrap your components in BikeProvider."
    );
  }

  const { getBikeById } = bikeContext;

  useEffect(() => {
    if (bikeId) {
      getBikeById(bikeId)
        .then((bike) => {
          if (bike) {
            setBike(bike);
            setTotalPrice(bike.price.toString());
          }
        })
        .catch((err) => {
          console.error("Error fetching bike details:", err);
        });
    }
  }, [bikeId, getBikeById]);

  useEffect(() => {
    if (bike && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        alert("End date cannot be before the start date.");
        return;
      }

      const diffInTime = end.getTime() - start.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      const price = bike.price || 0;
      setTotalPrice((diffInDays * price).toFixed(2));
    }
  }, [startDate, endDate, bike]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bikeId) {
      console.error("Bike ID is missing!");
      return;
    }

    const bookingData: BookingType = {
        id: "",
        bookingId: "",
      startDate,
      endDate,
      totalPrice: parseFloat(totalPrice),
      bikeId,
    };

    try {
      await bookingContext?.createBooking(bookingData);

      navigate("/bikes");
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="startDate">Start Date*:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <label htmlFor="endDate">End Date*:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />

      <div>
        <h3>Total Price: €{totalPrice}</h3>
      </div>

      <label htmlFor="bikeId">Selected Bike:</label>
      <input type="text" id="bikeId" value={bikeId} readOnly disabled />

      <button type="submit">Create Booking</button>
    </form>
  );
}
