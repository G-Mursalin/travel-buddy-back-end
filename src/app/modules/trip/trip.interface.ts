import { Types } from 'mongoose';

export interface TPhoto {
    id: number;
    image: string;
}

export interface TTrip {
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    travelType: 'adventure' | 'leisure' | 'business';
    photos: TPhoto[];
    userId: Types.ObjectId;
}
