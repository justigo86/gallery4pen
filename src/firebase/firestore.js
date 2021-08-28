import { useState, useEffect } from 'react';
import { firestore } from './firebase_config'

// reusable hook to export files from collection into gallery
const useFirestore = (collection) => {
    const [ docs, setDocs ] = useState([]); //initial state of docs will be an empty array
    const unmount = useEffect(() => {
        firestore.collection(collection)    //function to take a snapshot of the collection
        .orderBy('createdAt', 'desc')   //order each file by the date it was uploaded, descending order
        .onSnapshot((snapshot) => {     //takes snapshot
            let documents = [];     //create an empty array that will update when files are added
            snapshot.forEach(doc => {   //for each file in the collection
                documents.push({...doc.data(), //we pull all data (spread) from the document and add it to the documents array
                id: doc.id }) //also need to pull the doc id
            })
            setDocs(documents);     //after pushing the doc information to the array, need to update state of docs to include array
        })
        return () => unmount;     //cleanup function to unmount from unmounted components (to prevent further state updates)
    }, [collection])    //use collection as the dependency
    return { docs }
}

export default useFirestore
