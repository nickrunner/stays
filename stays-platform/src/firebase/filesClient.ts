import { UploadResponse, FileOptions } from "@google-cloud/storage";
import axios from "axios";
import { request } from "http";
import { blob } from "stream/consumers";
import fs from "fs";
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
    
    public saveToStorage(attachmentUrl:string, objectName:string) {
        const request = require('request');
        const req = request(attachmentUrl);
        req.pause();
        req.on('response', (res: { statusCode: number; headers: { [x: string]: any; }; }) => {
      
          // Don't set up the pipe to the write stream unless the status is ok.
          // See https://stackoverflow.com/a/26163128/2669960 for details.
          if (res.statusCode !== 200) {
            return;
          }
      
          const writeStream = storage.bucket().file(objectName)
            .createWriteStream({
      
              // Tweak the config options as desired.
              gzip: true,
              public: true,
              metadata: {
                contentType: res.headers['content-type']
              }
            });
          req.pipe(writeStream)
            .on('finish', () => console.log('saved'))
            .on('error', (err: any) => {
              writeStream.end();
              console.error(err);
            });
      
          // Resume only when the pipe is set up.
          req.resume();
        });
        req.on('error', (err: any) => console.error(err));
      }

    public async uploadFile(src: Blob, dstPath: string): Promise<void>{


        // Upload file and metadata
       
        const storageRef = storage.bucket();

        const file = storageRef.file(dstPath);
        const blobStream = file.createWriteStream();
        // blobStream.on('error', err => {
        //     console.log("Error: "+JSON.stringify(err, null, 2));
        //   });
        //   console.log('===---> ', 'no errors::::');
        
        // blobStream.on('finish', () => {
        //     console.log('done::::::', `https://storage.googleapis.com/${storageRef.name}/${file.name}`)
        //     });
        
        await blobStream.write(src);
        console.log('===---> ', 'past finish::::');
        blobStream.end();
        console.log('===---> ', 'at end::::');
    }

    public async download(url: string): Promise<Blob>{
        const response = await axios.get(url, {
            responseType: 'blob'
        });
        const blob: Blob = response.data;
        
       return blob;
    }
}