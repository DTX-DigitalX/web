import { User } from './user.model';
import * as domains from './domains.model';
import { Observable } from 'rxjs/Observable';

export class Idea {
    _id: string;
    name: string;
    description: string;
    type: domains.TypeIdea;
    rating: domains.RatingIdeas;
    dimension: domains.Dimensions;
    businessUnit: domains.BussinesUnits;
    businessUnitLocal: domains.BusinessUnitLocals;
    occupationArea: domains.OccupationAreas;
    estimatedInvestment: string;
    estimatedReturn: string;
    contributors: User[];
    cover: string;
    createdAt: Date;
    statusIdea: domains.StatusIdea;
    attachments: string[];
}

export class IdeaDto {
    _id: string;
    name: string;
    description: string;
    type: string;
    rating: string;
    dimension: string;
    businessUnit: string;
    businessUnitLocal: string;
    occupationArea: string;
    estimatedInvestment: string;
    estimatedReturn: string;
    contributors: string[];
    cover: string;
}
