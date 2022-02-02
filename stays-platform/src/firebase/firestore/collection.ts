import { Entity } from "../../../../common/models/Entity";
import { v4 as uuidv4 } from 'uuid';
import {CollectionReference, DocumentSnapshot, Query, QuerySnapshot } from "firebase-admin/firestore";
import { createCollection, firestore } from "../firebase";
import { Error404 } from "../../error";
import { CollectionFilter } from "./collectionFilter";



export class Collection<Type> {

    private col: CollectionReference<Entity & Type>;

    public constructor(name: String){
        this.col = createCollection<Entity & Type>(name.toString());
    }


    public async getAll(filters?: CollectionFilter[]): Promise<(Entity & Type)[]>{
        console.log("getAll() filters: ", {filters});
        const results: Map<string, (Entity & Type)> = new Map();
        if (filters && filters.length > 0){
            let qSnap = await this.col.where(filters[0].key, filters[0].op, filters[0].val).get();
            qSnap.forEach((doc) => { 
                results.set(doc.data().id, doc.data());
            });
            let i = 0;
            filters.forEach( async (f: CollectionFilter) =>{
                if(i > 0){
                    const qSnap = await this.col.where(f.key, f.op, f.val).get();
                    qSnap.forEach((doc) => { 
                        const data = doc.data();
                        if(f.or){
                            results.set(data.id, data);
                        }
                        else if(!results.has(data.id)){
                            results.delete(data.id);
                        };
                    });
                }
                i = i+1;
            });
        }
        else{
            const qSnap: QuerySnapshot<Entity & Type> = await this.col.get();
            qSnap.forEach((doc) => {
                results.set(doc.data().id, doc.data());
            })
        }
        return Array.from(results.values());
    }

    public async getSome(filters: any, start: Number, end: Number){
         // todo: 
    }

    public async getFirst(filters?: CollectionFilter[]): Promise< (Entity & Type) > {
        console.log("getFirst() filters: ", {filters});
        if(filters){
            const id = this.hasId(filters);
            if(id){
                console.log("exists() contains ID: "+id);
                const docSnap: DocumentSnapshot<Entity & Type> = await this.col.doc(id).get();
                const data = docSnap.data();
                if(data != undefined){
                    return data;
                }
            }
        }
        const results: (Entity & Type)[] = await this.getAll(filters);
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

    private hasId(filters: CollectionFilter[]): string | undefined{
        for(let filter of filters){
            if(filter.key == "id"){
                return filter.val;
            }
        }
        return undefined;
    }

    public async exists(filters: CollectionFilter[]): Promise<boolean> {
        console.log("exists() filters: ", {filters});
        const id: string | undefined = this.hasId(filters);
        if(id){
            console.log("exists() contains ID: "+id);
            const docSnap: DocumentSnapshot<Entity & Type> = await this.col.doc(id).get();
            console.log("exists() ? "+docSnap.exists);
            return docSnap.exists;
        }
        const results: (Entity & Type)[] = await this.getAll(filters);
        const retval =  results.length > 0;
        console.log("exists() ? "+retval);
        return retval;
    }

    public async create(attributes: any, clientId?: string): Promise<Entity & any> {
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
        const newEntity: Entity & Type = {... original, ...attributes};
        console.log("updateEntity() new entity: ", {newEntity});
        return newEntity;
    }

}