/* eslint-disable @typescript-eslint/no-explicit-any */
export enum Logic {
  and = "and",
  or = "or"
}

export class ColExpression {
  public op: FirebaseFirestore.WhereFilterOp = "==";
  public key = "";
  public val: any = "";
  public conj: Logic = Logic.and;

  public constructor(key: string) {
    this.key = key;
  }
}

export class CollectionQuery {
  public expressions: ColExpression[] = [];
  public queries: CollectionQuery[] = [];
  public conj = Logic.and;

  private exp(): ColExpression {
    return this.expressions[this.expressions.length - 1];
  }
  public set(op: FirebaseFirestore.WhereFilterOp, val?: any): CollectionQuery {
    if (!val) {
      this.expressions.pop();
      return this;
    }
    this.exp().op = op;
    this.exp().val = val;
    return this;
  }
  public where(key: string): CollectionQuery {
    this.expressions.push(new ColExpression(key));
    return this;
  }
  public and(key: string): CollectionQuery {
    this.where(key).exp().conj = Logic.and;
    return this;
  }
  public or(key: string): CollectionQuery {
    this.where(key).exp().conj = Logic.or;
    return this;
  }
  public eq(val?: any): CollectionQuery {
    return this.set("==", val);
  }
  public neq(val?: any): CollectionQuery {
    return this.set("!=", val);
  }
  public lt(val?: any): CollectionQuery {
    return this.set("<", val);
  }
  public ltEq(val?: any): CollectionQuery {
    return this.set("<=", val);
  }
  public gt(val?: any): CollectionQuery {
    return this.set(">", val);
  }
  public gtEq(val?: any): CollectionQuery {
    return this.set(">=", val);
  }
  public arrContains(val?: any): CollectionQuery {
    return this.set("array-contains", val);
  }
  public arrContainsAny(val?: any): CollectionQuery {
    return this.set("array-contains-any", val);
  }
  public in(val?: any): CollectionQuery {
    return this.set("in", val);
  }
  public notIn(val?: any): CollectionQuery {
    return this.set("not-in", val);
  }
  public inRange(min: number, max: number) {
    return this.gtEq(min).and(this.exp().key).ltEq(max);
  }
  public andQuery(query: CollectionQuery): CollectionQuery {
    query.conj = Logic.and;
    this.queries.push(query);
    return this;
  }
  public orQuery(query: CollectionQuery): CollectionQuery {
    query.conj = Logic.or;
    this.queries.push(query);
    return this;
  }
}

export class CollectionQueryBuilder {
  public q: CollectionQuery = new CollectionQuery();
}
