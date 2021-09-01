import mongoose, { Schema } from 'mongoose';

import IOrganization from '../interfaces/organization';

const OrganizationSchema: Schema = new Schema(
    {
        organizationName: {
            type: String,
            required: 'Organization Name required.',
            trim: true
        },
        aboutOrganization: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        twitterUrl: {
            type: String,
            trim: true
        },
        linkedinUrl: {
            type: String,
            trim: true
        },
        facebookUrl: {
            type: String,
            trim: true
        },
        website: {
            type: String,
            trim: true
        },
        organizationUrl: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
