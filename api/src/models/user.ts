import mongoose, { Schema } from 'mongoose';

import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: 'Email required.', trim: true, unique: true, lowercase: true },
        password: { type: String, required: 'Password required.', trim: true },
        firstName: {
            type: String,
            required: 'First Name required.'
        },
        lastName: {
            type: String,
            required: 'Last Name required.'
        },
        aboutMe: {
            type: String,
            trim: true
        },
        role: {
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
        profileUrl: {
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
        isActive: Boolean,
        organization: { type: Schema.Types.ObjectId, ref: 'organization' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
