import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
// import ProgressBar from './ProgressBar';

import { storage, firestore, timestamp } from '../firebase/firebase_config';

const Form = styled.form `
    text-align: center;
    margin: 10px auto;
`
const Input = styled.input `
    height: 0;
    width: 0;
    opacity: 0;
    `
const FormLabel = styled.label `
    cursor: pointer;
    display: block;
    width: 100px;
    /* height: 30px; */
    border: 3px solid white;
    border-radius: 12px;
    margin: 10px auto;
    color: white;
    font-weight: bold;
    font-size: 16px;
    &:hover {
        background: #000;
        color: hsl(210, 36%, 96%);
    }
`

const UploadForm = () => {
    const [images, setImages] = useState([]);
    const [ file, setFile ] = useState(null);     //setting initial states of file and newFile
    const [ error, setError ] = useState(null);    //establishing errors, initially null state
    const filetypes = ['image.png', 'image/jpeg', 'image/jpg'];   //user submitted filetypes can only be png/jpeg
    const [ progress, setProgress ] = useState(0);
    const [ url, setUrl ] = useState([]);

    const picUpload = (e) => {
        // let setImages = [];

        for (let i = 0; i < e.target.files.length; i++) {
            let images = e.target.files[i];
            setImages((prevState) => [...prevState, images]);
            
            if (images && filetypes.includes(images.type)) {
                setFile(images);        //updating setFile state to the user entered file
                setError('');        //clears error if previously displayed
            } else {                
                setFile(null);      //if the image submitted does not match type, clear image selected
                setError('Please use a png or jpeg image type.');   //and display an error message
            }
        }
                    //if an image is submitted and the type (from file info) matches filetypes
    }
    
    useEffect(() => {
        // const promises = [];
        images.map((image) => {

            //create a reference in storage for each file
            const storageRef = storage.ref(image.name).put(image);
    
            // promises.push(storageRef);
    
            //establish a collection/gallery for files
            const collectionRef = firestore.collection('images');
            //then input the file into the reference - once the state of the file changes (must wait for upload to finish)
            storageRef.on('state_changed', (snapshot) => {
                //as the file is uploaded, we are getting snapshots of upload progress - displayed as percentage
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);    //progress will be percentage displayed
            }, (err) => {
                //third argument is the error message
                setError(err);
            }, async () => {
                //pass file url and pass it to the storage reference
                await storage
                    .ref(image.name)
                    .getDownloadURL()
                //add the url above to the collection, along with timestamp
                    .then((url) => {
                        const desc = 'testing plop';
                        const createdAt = timestamp();      //create timestamp variable
                        collectionRef.add( { url, createdAt, desc })
                         //set the referenced url to the established url var
                        setUrl((prevState) => [...prevState, url])
                    })
            })      //function will process every time a file is submitted
        // Promise.all(promises);
        setImages([]);
        })
    }, [images])

    return (
        //form that accepts files from user to upload to gallery
        <Form>
            <FormLabel>
                Add Photos
                <Input type='file' multiple onChange={picUpload}/>
            </FormLabel>
            <div className='message'>
                {/* {file && <div> {file.name} </div>}
                {file && <ProgressBar file={file} setFile={setFile} />} */}
                    {/* display filename with upload progress bar or error messages */}
                {error && <div> {error} </div>}
            </div>
        </Form>
    )
}

export default UploadForm