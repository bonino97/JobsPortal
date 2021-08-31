import mongoose, { Schema } from 'mongoose';

import IJob from '../interfaces/job';

const JobSchema: Schema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: 'Title required.'
        },
        location: {
            type: String,
            trim: true
        },
        salary: {
            type: String,
            trim: true
        },
        contractType: {
            type: String,
            trim: true
        },
        seniority: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        jobUrl: {
            type: String,
            trim: true
        },
        isActive: {
            type: String,
            trim: true
        },
        organization: { type: Schema.Types.ObjectId, ref: 'organization' },
        hired: { type: Schema.Types.ObjectId, ref: 'user' },
        recruiter: { type: Schema.Types.ObjectId, ref: 'user' },
        skills: [{ type: Schema.Types.ObjectId, ref: 'skills' }],
        candidates: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IJob>('Job', JobSchema);
