import { Types } from 'mongoose';

export interface TTrip {
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    travelType: 'adventure' | 'leisure' | 'business';
    photo: string;
    userId: Types.ObjectId;
}
