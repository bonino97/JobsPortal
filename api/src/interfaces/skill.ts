import { Document } from 'mongoose';

export default interface ISkill extends Document {
    skill: string;
    createdAt?: Date;
    updatedAt?: Date;
}
