import { UploadResponse } from "@google-cloud/storage";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; 
import { storage } from "./firebase";
var FileReader = require('filereader')

export type UploadStatusCallback = ((file: File, state: string, progress: number) => any);
export type UploadErrorCallback = ((file: File, error: string) => any);
export type UploadCompleteCallback = ((url: string) => any);
export interface FileUploadListener {
    onStatusChange: UploadStatusCallback; 
    onError: UploadErrorCallback;
    onComplete: UploadCompleteCallback;
}


export class FilesClient {
    

    public async uploadFile(srcPath: string, dstPath: string): Promise<string>{


        // Upload file and metadata
        const name = uuidv4();
        const storageRef = storage.bucket();
        
        await storageRef.upload(srcPath, {
            destination: dstPath+"/"+name
        } );
        const url = await storageRef.file(name).getSignedUrl({
            action: "read",
            expires: Date.now() + 604800000 
        });
        return url[0];
    }

    public async download(url: string): Promise<Blob>{
        const response = await axios.get(url, {
            responseType: 'blob'
        });
        const blob: Blob = response.data;
       return blob;
    }
}