import mongoose, { Schema } from 'mongoose';

import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: 'Email required.', trim: true, unique: true, lowercase: true },
        password: { type: String, required: 'Password required.', trim: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
