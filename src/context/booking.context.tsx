import axios from "axios";
import React, {useState, createContext } from "react";
import { BookingContextType, BookingType } from "../types";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [bookings, setBookings] = useState<BookingType[]>([]);
    const [booking, setBooking] = useState<BookingType | null>(null);



    const getBookingById = async (bookingId: string)  => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`)
            return response.data;
        } catch (err) {
            console.log("error fetching booking", err);
        }
    };


    const createBooking = async (bookingData: BookingType) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings/:bikeId`, bookingData);
            setBookings((prevBookings) => [response.data, ...prevBookings]);
        } catch (err) {
            console.log("error creating booking", err);
        }
    };


    const updateBooking = async (updatedBooking: BookingType) => {
        try {
            const { id: bookingId } = updatedBooking;

            const response = await axios.put<BookingType>(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, updatedBooking)
            setBookings((prevBookings) => 
                prevBookings ? prevBookings.map((booking) => 
                  booking.id === bookingId ? response.data : booking
                ) : []);
        } catch (err) {
            console.log("error updating booking info", err)
        }
    };


    const deleteBooking = async (bookingIdPromise: Promise<any>) => {
        try {
            const bookingId = await bookingIdPromise;
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`)
            setBookings((prevBookings) => prevBookings ? prevBookings.filter((booking: BookingType) => booking.id !== bookingId) : []);
        } catch (err) {
            console.log("error deleting booking", err)
        }
    };


    return (
        <BookingContext.Provider value={{booking, setBooking, bookings, createBooking, updateBooking, getBookingById, deleteBooking}}>{children}</BookingContext.Provider>
    )
};

export { BookingContext, BookingProvider };