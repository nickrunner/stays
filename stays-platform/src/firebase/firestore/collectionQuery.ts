

export class ColExpression {
    public op: FirebaseFirestore.WhereFilterOp = "==";
    public key:string = "";
    public val:any = "";
    public _or: boolean = false;

    public constructor(key: string){
        this.key = key;
    }
}

export class CollectionQuery {
    public expressions: ColExpression[] = [];

    private exp(): ColExpression{
        return this.expressions[this.expressions.length-1];
    }
    public set(op: FirebaseFirestore.WhereFilterOp, val?: any): CollectionQuery{
        if(!val){
            this.expressions.pop();
            return this;
        }
        this.exp().op = "==";
        this.exp().val = val;
        return this;
    }
    public where(key: string, op?: FirebaseFirestore.WhereFilterOp, val?: any): CollectionQuery {
        this.expressions.push(new ColExpression(key));
        return this;
    }
    public and(key: string): CollectionQuery{
        this.where(key).exp()._or = false;
        return this;
    }
    public or(key: string): CollectionQuery{
        this.where(key).exp()._or = false;
        return this;
    }
    public eq(val?:any): CollectionQuery{
        return this.set("==", val);
    }
    public neq(val?: any): CollectionQuery{
        return this.set("!=", val);
    }
    public lt(val?: any): CollectionQuery{
        return this.set("<", val);
    }
    public ltEq(val?: any): CollectionQuery{
        return this.set("<=", val);
    }
    public gt(val?: any): CollectionQuery{
        return this.set(">", val);
    }
    public gtEq(val?: any): CollectionQuery{
        return this.set(">=", val);
    }
    public arrContains(val?: any): CollectionQuery{
        return this.set("array-contains", val);
    }
    public arrContainsAny(val?: any): CollectionQuery{
        return this.set("array-contains-any", val);
    }
    public in(val?: any):CollectionQuery{
        return this.set("in", val);
    }
    public notIn(val?: any): CollectionQuery{
        return this.set("not-in", val);
    }
    public inRange(key: string, min: number, max: number){
        return this.gtEq(min).and(key).ltEq(max);
    }
}


export class CollectionQueryBuilder {
    public q: CollectionQuery  = new CollectionQuery();

    
}

