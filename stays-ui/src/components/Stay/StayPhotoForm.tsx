import { Box } from "@mui/material";
import { Photo } from "../../models/Photo";
import { stayContext, StayContext } from "./StayContext";
import {  DropzoneDialog } from 'material-ui-dropzone';
import { FilesClient } from "../../clients/filesClient";
import { useContext } from "react";
import { StayPhotoCard } from "./StayPhotoCard";
import React from "react";
import { LoadingButton } from "@mui/lab";
import update from 'immutability-helper';

export default function StayPhotoForm(props:any) {
    const { stay } = useContext(stayContext);
    const [photos, setPhotos] = React.useState<Photo[]>(stay.photos); 
    const [open, setOpen] = React.useState(false);
    const [fileCount, setFileCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);


    function handleCompletionEvent(){
        setFileCount(fileCount - 1);
        if(fileCount == 0){
            setLoading(false);
            setPhotos(stay.photos);
        }
    }
    
    function handleFileUploadError(file: File, error: string){
        console.log("Error: "+error);
        handleCompletionEvent();
    }

    function handleFileUploadComplete(file: File, url: string){
        stay.photos.push(
            {
                url: url,
                description: "",
                priority: stay.photos.length,
            }
        );
        console.log("Added photo: ", {stay});
        handleCompletionEvent();
    }

    function handleFileUploadStatus(file: File, status: string, progress: number){
        console.log("status: "+status+" progress: "+progress);
    }

    function handleSubmit(files: File[]){
        setFileCount(files.length);
        const filesClient = new FilesClient();
        for(let file of files){
            setLoading(true);
            filesClient.uploadFile(file, "images/", {
                onComplete: handleFileUploadComplete,
                onError: handleFileUploadError,
                onStatusChange: handleFileUploadStatus
            });
        }
    }


    const moveCard = React.useCallback(
        (dragIndex, hoverIndex) => {
          const dragPhoto = photos[dragIndex]
          setPhotos(
            update(photos, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragPhoto],
              ],
            }),
          )
        },
        [photos],
    )
    const renderCard = (photo: Photo, index: number) => {
    return (
        <StayPhotoCard 
            key={photo.priority} 
            photo={photo} 
            index={index} 
            id={photo.priority} 
            moveCard={moveCard} 
        />
      )
    }
    

    return (
        <StayContext>
            <Box sx={{mt:1, mr:5, ml:5, justifyContent:"center"}} margin="auto">
            <LoadingButton 
            fullWidth={true}
            variant="contained" 
            color="primary" 
            onClick={() => setOpen(true)}
            loading={loading}
            >
                Add Photo
            </LoadingButton>
            <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                showAlerts={true}
                filesLimit={5}
                maxFileSize={5000000}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files: File[]) => {
                    handleSubmit(files);
                    setOpen(false);
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
                clearOnUnmount={true}
            />
            </Box>
            
            <Box margin="auto" sx={{justifyContent:"center"}}>
                {photos.map((photo, i) => renderCard(photo, i))}
            </Box>
         
        </StayContext> 
    );
}