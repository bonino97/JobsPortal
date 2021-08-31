import { Document } from 'mongoose';

export default interface IOrganization extends Document {
    email: string;
    password: string;
    organizationName: string;
    aboutOrganization?: string;
    country?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    facebookUrl?: string;
    website?: string;
    organizationUrl?: string;
    image?: string;
    token?: string;
    expires?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}
