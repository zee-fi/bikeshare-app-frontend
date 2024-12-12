import axios from "axios";
import React, {useState, useEffect, createContext } from "react";
import { BikeType, BikeContextType } from "../types";

const BikeContext = createContext<BikeContextType | undefined>(undefined);

const BikeProvider = ({ children }: { children: React.ReactNode }) => {
    const [bikes, setBikes] = useState<BikeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [bike, setBike] = useState<BikeType | null>(null);

    
    const getBikes = async () => {
        setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bikes`);
                setBikes(response.data);
            } catch (err) {
                console.log("error fetching bikes", err);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        getBikes();
      }, []);


    const getBikeById = async (bikeId: string)  => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bikes/${bikeId}`)
            return response.data;
        } catch (err) {
            console.log("error fetching bike", err);
        }
    };


    const createBike = async (bikeData: BikeType): Promise<void> => {
        console.log("Payload sent to server:", bikeData);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/bikes/`, bikeData);
            setBikes((prevBikes) => [response.data, ...prevBikes]);
        } catch (err) {
            console.log("error creating bike", err);
        }
    };


    const updateBike = async (updatedBike: BikeType) => {
        try {
            const { id: bikeId } = updatedBike;

            const response = await axios.put<BikeType>(`${import.meta.env.VITE_API_URL}/api/bikes/${bikeId}`, updatedBike)
            setBikes((prevBikes) => 
                prevBikes ? prevBikes.map((bike) => 
                  bike.id === bikeId ? response.data : bike
                ) : []);
        } catch (err) {
            console.log("error updating bike info", err)
        }
    };


    const deleteBike = async (bikeIdPromise: Promise<any>) => {
        try {
            const bikeId = await bikeIdPromise;
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/bikes/${bikeId}`)
            setBikes((prevBikes) => prevBikes ? prevBikes.filter((bike: BikeType) => bike.id !== bikeId) : []);
        } catch (err) {
            console.log("error deleting bike", err)
        }
    };


    return (
        <BikeContext.Provider value={{bike, setBike, bikes, loading, getBikes, createBike, updateBike, getBikeById, deleteBike}}>{children}</BikeContext.Provider>
    )
};

export { BikeContext, BikeProvider };