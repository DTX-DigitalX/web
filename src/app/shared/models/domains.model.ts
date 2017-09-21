import { Observable } from 'rxjs/Observable';

export class TypeIdea {
    _id: string
    name: string
    __v: string
}

export class Dimensions {
    _id: string
    name: string
    __v: string
}

export class OccupationAreas {
    _id: string
    name: string
    __v: string
}

export class BussinesUnits {
    _id: string
    name: string
    __v: string
    businessUnitLocals: BusinessUnitLocals
}

export class BusinessUnitLocals {
    _id: string
    name: string
    businessUnit: string
    __v: string
}

export class RatingIdeas {
    _id: string
    name: string
    __v: string
}

export class Domains {
    typeIdeas: TypeIdea[]
    dimensions: Dimensions[] 
    occupationAreas: OccupationAreas[] 
    bussinesUnits: BussinesUnits[] 
    ratingIdeas: RatingIdeas[] 
}

export class StatusIdea {
    _id: string
    name: string
    code: string
    icon: string
    __v: string
}
