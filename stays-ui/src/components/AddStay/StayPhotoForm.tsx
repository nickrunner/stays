import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Photo } from "../../models/Stay";
import { addStayContext, AddStayContext } from "./AddStayContext";
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import { FilesClient } from "../../clients/filesClient";
import { useContext } from "react";
import StayPhotoCard from "./StayPhotoCard";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { width } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export default function StayPhotoForm(props:any) {
    const { stay } = useContext(addStayContext);
    const [photos, setPhotos] = React.useState<Photo[]>([]); 
    const [open, setOpen] = React.useState(false);
    const [fileCount, setFileCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    React.useEffect( () => {
        setPhotos(stay.photos);
        return;
    });

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



    return (
        <AddStayContext>
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
                showAlerts={false}
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
                {/* <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files: File[]) => handleFileSelection(files)}
                    onDelete={(file: File) => console.log('Removed File:', file)}
                    /> */}
            </Box>
            <Box margin="auto" sx={{justifyContent:"center"}}>
                {photos.map((photo) => {
                    return <StayPhotoCard key={photo.url} photo={photo} />
                })}
            </Box>
        </AddStayContext> 
    );
}