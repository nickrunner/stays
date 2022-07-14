import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../firebase";

export type UploadStatusCallback = (file: File, state: string, progress: number) => any;
export type UploadErrorCallback = (file: File, error: string) => any;
export type UploadCompleteCallback = (file: File, url: string) => any;
export interface FileUploadListener {
  onStatusChange: UploadStatusCallback;
  onError: UploadErrorCallback;
  onComplete: UploadCompleteCallback;
}

export class FilesClient {
  public async uploadFile(file: File, path: string, listener: FileUploadListener) {
    // Upload file and metadata
    const fullPath = path + "/" + file.name;
    console.log("Uploading file to: " + fullPath);
    const storageRef = ref(storage, fullPath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        listener.onStatusChange(file, snapshot.state, progress);
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        listener.onError(file, error.code);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        try {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            listener.onComplete(file, downloadURL);
          });
        } catch (err) {
          listener.onError(file, "Failed getting download URL");
        }
      }
    );
  }

  public async download(url: string): Promise<Blob[]> {
    const response = await axios.get(url, {
      responseType: "blob"
    });
    return [response.data];
  }
}
