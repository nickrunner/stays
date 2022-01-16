import { Entity } from "../../../../common/models/Entity";
import { v4 as uuidv4 } from 'uuid';
import {CollectionReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { createCollection, firestore } from "../firebase";
import { Error404 } from "../../error";

export class Collection<Type> {

    private col: CollectionReference<Entity & Type>;

    public constructor(name: String){
        this.col = createCollection<Entity & Type>(name.toString());
    }

    public async getAll(filters?: any, or?: boolean): Promise< (Entity & Type)[]>{
        console.log("getAll() filters: ", {filters});
        const and: boolean = !or;
        const results: (Entity & Type)[] = [];
        let processed = false;
        if(filters){
            for(const key in filters){
                if(!filters[key]){
                    continue;
                }
                processed = true;
                console.log("getAll() query: "+key+" == "+filters[key]);
                const qSnap: QuerySnapshot<Entity & Type> = await this.col.where(key, "==", filters[key]).get();
                qSnap.forEach((doc) => {
                    let match = true;
                    if(and){
                        const result = doc.data() as any;
                        for(const key in filters){
                            if(!filters[key]){
                                continue;
                            }
                            if(!result[key]){
                                match = false;
                                break;
                            }
                            if(result[key] !== filters[key] )  {
                                match = false;
                                break;
                            }                 
                        }
                    }
                    if(match){
                        results.push(doc.data());
                    }
                })
            }
        }
        if(!processed){
            const qSnap: QuerySnapshot<Entity & Type> = await this.col.get();
            qSnap.forEach((doc) => {
                results.push(doc.data());
            })
        }
        
        return results;
    }

    public async getSome(filterss: any, start: Number, end: Number){
         // todo: 
    }

    public async getFirst(filters?: any): Promise< (Entity & Type) > {
        console.log("getFirst() filters: ", {filters});
        if(filters){
            console.log("getFirst(): filters present");
            if(filters.hasOwnProperty('id')){
                console.log("getFirst() contains ID: "+filters.id);
                return await this.get(filters.id);
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

    public async exists(filters: any): Promise<boolean> {
        console.log("exists(): filters:", {filters});
        try{
            await this.getFirst(filters);
            console.log("exists() ? true");
            return true;
        }
        catch{
            console.log("exists() ? false");
            return false;
        }
    }

    public async create(attributes: any): Promise<Entity & any> {
        const entity: Entity & any = {
            createdAt: Date.now(),
            updatedAt: Date.now(),
            id: uuidv4(),
            ... attributes
        }
        console.log("create() enitity: ", {entity})
        await this.col.doc(entity.id).set(entity);
        return entity;
    }

    public async updateAll(attributes: any, filters?: any): Promise<(Entity & Type)[]>{
        console.log("updateAll() attr, filters", {attributes}, {filters});
        const entities: (Entity & Type)[] = await this.getAll(filters);
        const batch = firestore.batch();
        for(let entity of entities){
            entity = this.updateEntity(entity, attributes);
            const ref = this.col.doc(entity.id);
            batch.set(ref, attributes);
        }
        await batch.commit();
        return entities;
    }

    public async update(id: string, attributes: any): Promise<void>{
        const newAttr = {
            updatedAt: Date.now(),
            ... attributes
        }
        console.log("update() id: "+id, {newAttr});
        await this.col.doc(id).set(newAttr, {merge: true});
    }

    public async updateFirst(attributes: any, filters?: any): Promise<(Entity & Type)>{
        console.log("updateFirst() attr, filters", {attributes}, {filters});
        let entity: (Entity & Type) = await this.getFirst(filters);
        entity = this.updateEntity(entity, attributes);
        await this.col.doc(entity.id).set(attributes, {merge: true});
        return entity
    }

    private updateEntity(original: Entity & Type, attributes: any): Entity & Type{
        console.log("updateEntity() original: ", {original});
        console.log("updateEntity() new attr: ", {attributes});
        original.updatedAt = Date.now();
        const newEntity: Entity & Type = {... original, ...attributes};
        console.log("updateEntity() new entity: ", {newEntity});
        return newEntity;
    }

}