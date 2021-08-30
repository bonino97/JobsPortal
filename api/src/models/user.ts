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

        aboutMe: String,
        enterprise: String,
        enterpriseRole: String,
        country: String,
        twitterUrl: String,
        linkedinUrl: String,
        facebookUrl: String,
        website: String,
        profileUrl: String,
        image: String,
        token: String,
        expires: Date,
        active: Boolean
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
