import mongoose, { Schema } from 'mongoose';

import IOrganization from '../interfaces/organization';

const OrganizationSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: 'Email required.',
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: 'Password required.',
            trim: true
        },
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
        },
        token: {
            type: String,
            trim: true
        },
        expires: Number,
        isActive: Boolean
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
