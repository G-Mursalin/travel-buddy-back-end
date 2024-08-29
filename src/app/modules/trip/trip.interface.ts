import { Types } from 'mongoose';

export interface TPhoto {
    id: number;
    image: string;
}

export interface TTrip {
    title: string;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    maxNumberOfPeople: number;
    numberOfBookingSpot: number;
    budget: number;
    travelType: 'adventure' | 'leisure' | 'business';
    photos: TPhoto[];
    user: Types.ObjectId;
}
