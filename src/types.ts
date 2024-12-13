
export type BikeType = {
    id?: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    deposit?: number;
    image?: string;
    owner?: string;
}

export type BikeContextType = {
    bike: BikeType | null,
    bikeId: string;
    setBikeId: React.Dispatch<React.SetStateAction<string>>;
    setBike: (bike: BikeType | null) => void,
    bikes: BikeType[],
    loading: boolean, 
    getBikes: () => Promise<void>; 
    getBikeById: (bikeId: string) => Promise<BikeType | undefined>; 
    createBike: (bikeData: BikeType) => Promise<void>; 
    updateBike: (updatedBike: BikeType) => Promise<void>; 
    deleteBike: (bikeId: Promise<any>) => Promise<void>;
    selectedBike: BikeType | null;
    setSelectedBike: React.Dispatch<React.SetStateAction<BikeType | null>>;
}

export type BookingType = {
    id?: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    bookingId?: string;
    bikeId: string;
}

export type BookingContextType = {
    booking: BookingType | null,
    setBooking: (booking: BookingType | null) => void,
    bookings: BookingType[],
    getBookingById: (bookingId: string) => Promise<BookingType | undefined>; 
    createBooking: (bookingData: BookingType) => Promise<void>; 
    updateBooking: (updatedBooking: BookingType) => Promise<void>; 
    deleteBooking: (bookingId: Promise<any>) => Promise<void>;
}