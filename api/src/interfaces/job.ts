import { Document } from 'mongoose';

import IOrganization from './organization';
import ISkill from './skill';
import IUser from './user';

export default interface IJob extends Document {
    title: string;
    location?: string;
    salary?: string;
    contractType?: string;
    seniority?: string;
    description?: string;
    url?: string;
    createdAt?: Date;
    updatedAt?: Date;
    skills?: [ISkill['_id']];
    organization?: IOrganization['_id'];
    recruiter?: IUser['_id'];
}
