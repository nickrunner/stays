import { Entity } from "../../../../common/models/Entity";
import { v4 as uuidv4 } from 'uuid';
import {CollectionReference, DocumentSnapshot, Query, QuerySnapshot } from "firebase-admin/firestore";
import { createCollection, firestore } from "../firebase";
import { Error404 } from "../../error";
import { ColExpression, CollectionQuery, Logic } from "./collectionQuery";
import { merge } from "lodash";
import { Pagination } from "../../../../common/models/Pagination";


export class Collection<Type> {

    private col: CollectionReference<Entity & Type>;

    public constructor(name: String){
        this.col = createCollection<Entity & Type>(name.toString());
    }


    public async getAll(query?: CollectionQuery): Promise<(Entity & Type)[]>{
       
        const results: Map<string, (Entity & Type)> = new Map();
        if (query && query.expressions.length > 0){
            console.log("getAll() query: "+ JSON.stringify(query, null, 2));
            let i = 0;
            for(const exp of query.expressions){
                const qSnap = await this.col.where(exp.key, exp.op, exp.val).get();
                const res2: Map<string, (Entity & Type)> = new Map();
                qSnap.forEach((doc) => { 
                    const data = doc.data();
                    if((i===0) || (exp.conj === Logic.or)){
                        results.set(data.id, data);
                    }
                    else{
                        res2.set(data.id, data);
                    }
                });
                if((i>0) && (exp.conj === Logic.and)){
                    results.forEach((value, key) => {
                        if(res2.has(key) === false){
                            results.delete(key);
                        }
                    })
                }
                
                i = i+1;
            }
            for(let subQuery of query.queries){
                console.log("Sub Query");
                if(subQuery.conj === Logic.or){
                    return Array.from(results.values()).concat(await this.getAll(subQuery));
                }
                else{
                    const subRes = await this.getAll(subQuery);
                    subRes.forEach((r) => {
                        if(results.has(r.id)){
                            results.delete(r.id);
                        }
                    })
                }
            }
        }
        else{
            console.log("getAll()");
            const qSnap: QuerySnapshot<Entity & Type> = await this.col.get();
            qSnap.forEach((doc) => {
                results.set(doc.data().id, doc.data());
            })
        }

        const retval = Array.from(results.values());
        //console.log("returning: "+JSON.stringify(retval, null, 2));
        return retval;
    }

    public async getSome(query?: CollectionQuery, pagination?:Pagination){
        let items: (Entity & Type)[] = await this.getAll(query); 
        if(pagination){
            items = items.slice(pagination?.lastEvaluatedKey, pagination.lastEvaluatedKey + pagination.count);
        }
        return items;
    }

    public async getFirst(query?: CollectionQuery): Promise< (Entity & Type) > {
        console.log("getFirst()");
        if(query){
            const id = this.hasId(query);
            if(id){
                console.log("exists() contains ID: "+id);
                const docSnap: DocumentSnapshot<Entity & Type> = await this.col.doc(id).get();
                const data = docSnap.data();
                if(data != undefined){
                    return data;
                }
            }
        }
        const results: (Entity & Type)[] = await this.getAll(query);
        if(results.length > 0){
            const result = results[0];
            console.log("getFirst() Found Item: ", {result} );
            return result;
        }
        else{
            //todo: handle 404
            console.log("getFirst() item not found");
            throw new Error("not found");
        }
    }

    public async get(id: string): Promise< Entity & any > {
        console.log("get() id: "+id);
        const docSnap: DocumentSnapshot<Entity & Type> = await this.col.doc(id).get();
        if(docSnap.exists){
            const result = docSnap.data();
            console.log("Found item: ", {result});
            return result;
        }
        else{
            //todo: Handle 404
            console.log("get() item not found");
            throw new Error404();
        }
    }

    public async delete(id: string): Promise< Entity & any > {
        console.log("delete() id: "+id);
        await this.col.doc(id).delete();
    }

    private hasId(query: CollectionQuery): string | undefined{
        for(let filter of query.expressions){
            if(filter.key == "id"){
                return filter.val;
            }
        }
        return undefined;
    }

    public async exists(query: CollectionQuery): Promise<boolean> {
        console.log("exists()");
        const id: string | undefined = this.hasId(query);
        if(id){
            console.log("exists() contains ID: "+id);
            const docSnap: DocumentSnapshot<Entity & Type> = await this.col.doc(id).get();
            console.log("exists() ? "+docSnap.exists);
            return docSnap.exists;
        }
        const results: (Entity & Type)[] = await this.getAll(query);
        const retval =  results.length > 0;
        console.log("exists() ? "+retval);
        return retval;
    }

    public async create(attributes: Type, clientId?: string): Promise<Entity & Type> {
        const entity: Entity & any = {
            createdAt: Date.now(),
            updatedAt: Date.now(),
            id: uuidv4(),
            ... attributes
        }
        if(clientId){
            entity.createdBy = clientId;
            entity.updatedBy = clientId;
        }
        console.log("create() enitity: ", {entity})
        await this.col.doc(entity.id).set(entity);
        return entity;
    }

    public async batchCreate(attributes: Type[], clientId?: string): Promise<void> {
        const batch = firestore.batch();
        for(let attr of attributes){
            const entity: Entity & Type = {
                createdAt: Date.now(),
                updatedAt: Date.now(),
                id: uuidv4(),
                ... attr
            }
            if(clientId){
                entity.createdBy = clientId;
                entity.updatedBy = clientId;
            }
            console.log("batchCreate() enitity: ", {entity})
            const ref = this.col.doc(entity.id);
            batch.set(ref, entity);
        }
       batch.commit();
    }

    public async updateAll(attributes: any, filters?: any, clientId?: string): Promise<(Entity & Type)[]>{
        console.log("updateAll() attr, filters", {attributes}, {filters});
        const entities: (Entity & Type)[] = await this.getAll(filters);
        const batch = firestore.batch();
        for(let entity of entities){
            entity = this.updateEntity(entity, attributes, clientId);
            const ref = this.col.doc(entity.id);
            batch.set(ref, attributes);
        }
        await batch.commit();
        return entities;
    }

    public async update(id: string, attributes: any, clientId?: string): Promise<void>{
        const newAttr = {
            updatedAt: Date.now(),
            ... attributes
        }
        if(clientId){
            newAttr.clientId = clientId;
        }
        console.log("update() id: "+id, {newAttr});
        await this.col.doc(id).set(newAttr, {merge: true});
    }

    public async updateFirst(attributes: any, filters?: any, clientId?: string): Promise<(Entity & Type)>{
        console.log("updateFirst() attr, filters", {attributes}, {filters});
        let entity: (Entity & Type) = await this.getFirst(filters);
        entity = this.updateEntity(entity, attributes, clientId);
        await this.col.doc(entity.id).set(attributes, {merge: true});
        return entity
    }

    private updateEntity(original: Entity & Type, attributes: any, clientId?: string): Entity & Type{
        console.log("updateEntity() original: ", {original});
        console.log("updateEntity() new attr: ", {attributes});
        original.updatedAt = Date.now();
        if(clientId){
            original.updatedBy = clientId;
        }
        const newEntity: Entity & Type = merge(original, attributes);
        console.log("updateEntity() new entity: ", {newEntity});
        return newEntity;
    }

}