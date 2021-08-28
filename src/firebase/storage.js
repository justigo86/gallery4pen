import { useState, useEffect } from 'react';
import { storage, firestore, timestamp } from './firebase_config';

const useStorage = (file) => {
    const [ progress, setProgress ] = useState(0);  //initial progress set to zero
    const [ error, setError ] = useState(null);
    const [ url, setUrl ] = useState(null);     //used for 

    useEffect(() => {

        // const promises = [];

        //create a reference in storage for each file
        const storageRef = storage.ref(file.name).put(file);

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
            const url = await storage.ref(file.name).getDownloadURL();
            //add the url above to the collection, along with timestamp
            const createdAt = timestamp();      //create timestamp variable
            collectionRef.add( { url, createdAt })
            //set the referenced url to the established url var
            setUrl(url);
        })
    }, [file])      //function will process every time a file is submitted
    return { progress, url, error }
}

export default useStorage;