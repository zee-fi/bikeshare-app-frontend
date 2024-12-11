
export type BikeType = {
    id: string;
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
    setBike: (bike: BikeType | null) => void,
    bikes: BikeType[],
    loading: boolean, 
    getBikes: () => Promise<void>; 
    getBikeById: (bikeId: Promise<any>) => Promise<BikeType | undefined>; 
    createBike: (bikeData: Promise<any>) => Promise<void>; 
    updateBike: (updatedBike: BikeType) => Promise<void>; 
    deleteBike: (bikeId: Promise<any>) => Promise<void>;
}

export type BookingType = {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    bikeId: string;
}

export type BookingContextType = {
    booking: BookingType | null,
    setBooking: (booking: BookingType | null) => void,
    bookings: BookingType[],
    loading: boolean, 
    getBookings: () => Promise<void>; 
    getBookingById: (bookingId: Promise<any>) => Promise<BookingType | undefined>; 
    createBooking: (bookingData: Promise<any>) => Promise<void>; 
    updateBooking: (updatedBooking: BookingType) => Promise<void>; 
    deleteBooking: (bookingId: Promise<any>) => Promise<void>;
}