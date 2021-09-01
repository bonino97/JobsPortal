import { Document } from 'mongoose';

export default interface IOrganization extends Document {
    organizationName: string;
    aboutOrganization?: string;
    country?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    facebookUrl?: string;
    website?: string;
    organizationUrl?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
