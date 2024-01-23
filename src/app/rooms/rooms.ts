export interface Room{
    totalRooms: number;
    availableRooms: number;
    bookedrooms: number;
}

export interface RoomList {
    roomNumber: string;
    roomType: string;
    amenities: string;
    price: number;
    photos: string;
    checkintime: Date;
    checkouttime: Date;
    rating: number;
}