import mongoose, { Schema } from 'mongoose';

import ISkill from '../interfaces/skill';

const SkillSchema: Schema = new Schema(
    {
        skill: { type: String, trim: true, unique: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISkill>('Skill', SkillSchema);
