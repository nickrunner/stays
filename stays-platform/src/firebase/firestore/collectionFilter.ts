export interface CollectionFilter {
    key: string,
    op: FirebaseFirestore.WhereFilterOp,
    val: any,
    or: boolean
}

export class CollectionFilterBuilder {

    private filters: CollectionFilter[] = [];

    public constructor(filters?: CollectionFilter[]){
        if(filters){
            this.filters = filters;
        }
    }
    
    public add(key: string, op: FirebaseFirestore.WhereFilterOp, val?: any, or?: boolean): CollectionFilterBuilder{
        if(!or){
            or = false;
        }
        if(val){
            this.filters.push({key: key, op:op, val: val, or:or});
        }
        return this;
    }

    public build(): CollectionFilter[] {
        return this.filters;
    }
}