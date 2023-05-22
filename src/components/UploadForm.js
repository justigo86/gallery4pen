import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import ProgressBar from './ProgressBar';

import { storage, firestore, timestamp } from "../firebase/firebase_config";

const Form = styled.form`
  text-align: center;
  margin: 10px auto;
  & > div {
    font-weight: 600;
  }
`;
const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
`;
const FormLabel = styled.label`
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
`;

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null); //setting initial states of file and newFile
  const [error, setError] = useState(null); //establishing errors, initially null state
  const filetypes = ["image.png", "image/jpeg", "image/jpg"]; //user submitted filetypes can only be png/jpeg
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState([]);

  const picUpload = (e) => {
    // let setImages = [];

    for (let i = 0; i < e.target.files.length; i++) {
      let images = e.target.files[i];
      console.log(images.size);
      if (images && filetypes.includes(images.type) && images.size < 1048577) {
        setImages((prevState) => [...prevState, images]);
        setFile(images); //updating setFile state to the user entered file
        setError(""); //clears error if previously displayed
      } else if (images.size > 1048576) {
        //if image is more than 1MB
        setFile(null); //clear image selected
        setError(
          "WARNING: File size too large. Please select file 1MB or less."
        ); //and display an error message
      } else {
        setFile(null); //clear image selected
        setError("WARNING: Please use png, jpg, or jpeg image types."); //and display an error message
      }
    }
  };

  useEffect(() => {
    // const promises = [];
    images.map((image) => {
      //create a reference in storage for each file
      const storageRef = storage.ref(image.name).put(image);

      // promises.push(storageRef);

      //establish a collection/gallery for files
      const collectionRef = firestore.collection("images");
      //then input the file into the reference - once the state of the file changes (must wait for upload to finish)
      storageRef.on(
        "state_changed",
        (snapshot) => {
          //as the file is uploaded, we are getting snapshots of upload progress - displayed as percentage
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage); //progress will be percentage displayed
        },
        (err) => {
          //third argument is the error message
          setError(err);
        },
        async () => {
          //pass file url and pass it to the storage reference
          await storage
            .ref(image.name)
            .getDownloadURL()
            //add the url above to the collection, along with timestamp
            .then((url) => {
              const desc = "testing pop";
              const createdAt = timestamp(); //create timestamp variable
              collectionRef.add({ url, createdAt, desc });
              //set the referenced url to the established url var
              setUrl((prevState) => [...prevState, url]);
            });
        }
      ); //function will process every time a file is submitted
      // Promise.all(promises);
      setImages([]);
    });
  }, [images]);

  return (
    //form that accepts files from user to upload to gallery
    <Form>
      <FormLabel>
        Add Photos
        <Input type="file" multiple onChange={picUpload} />
      </FormLabel>
      <p>
        **Add/delete functionality disabled after 12/2021 for
        security/vulnerability concerns.**
      </p>
      <div className="message">
        {/* {file && <div> {file.name} </div>}
                {file && <ProgressBar file={file} setFile={setFile} />} */}
        {/* display filename with upload progress bar or error messages */}
        {error && <div> {error} </div>}
      </div>
    </Form>
  );
};

export default UploadForm;
