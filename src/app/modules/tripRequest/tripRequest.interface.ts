import { Types } from 'mongoose';

export interface ITripRequest {
    tripId: Types.ObjectId;
    userId: Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
}
