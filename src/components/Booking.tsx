import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingContext } from "../context/booking.context";
import { BookingType } from "../types";

export default function Booking (){
    const {bookingId} = useParams();
    const bookingContext = useContext(BookingContext);
    if (!bookingContext) {
      throw new Error("BookingContext is not provided. Please wrap your components in BookingProvider.");
    }

    const { getBookingById, deleteBooking } = bookingContext;
    const [booking, setBooking] = useState<BookingType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
          if (!bookingId) {
            console.log("Booking Id is undefined");
            setLoading(false);
            return;
          }

          try {
            const bookingData = await getBookingById(bookingId); 
            setBooking(bookingData || null); 
          } catch (err) {
            console.error("Error fetching booking details", err);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchBooking();
      }, [bookingId, getBookingById]); 
    
      if (loading) {
        return <p>Loading booking details...</p>;
      }
    
      if (!booking) {
        return <p>Booking not found!</p>; 
      }

      const handleDelete = async () => {
        try {
          if (bookingId) {
            await new Promise<void>((resolve, reject) => {
              deleteBooking(Promise.resolve(bookingId))
                .then(() => resolve())
                .catch((err) => reject(err));
            });
            console.log("Booking deleted successfully.");
          }
        } catch (err) {
          console.error("Error deleting booking", err);
        }
      };

    return(
        <div className="booking-details">
            <h2>{booking.id}</h2>
      <p>
        <strong>Total Price:</strong> ${booking.totalPrice}
      </p>
      <p>
        <strong>Start:</strong> ${booking.startDate}
      </p>
      <p>
        <strong>End:</strong> ${booking.endDate}
      </p>
      <p>
        <strong>Contact Owner:</strong>
      </p>
      <button onClick={handleDelete}>Delete Booking</button>
    </div>
    )
}

