import { Document } from 'mongoose';
export default interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    aboutMe?: string;
    enterprise?: string;
    enterpriseRole?: string;
    country?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    facebookUrl?: string;
    website?: string;
    profileUrl?: string;
    image?: string;
    token?: string;
    expires?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}
