import React, {useState, useEffect} from 'react';
import useFirestore from '../firebase/firestore';
import { firestore } from '../firebase/firebase_config';
import styled from 'styled-components';

const SearchBox = ({ updateSearch }) => {
    const [ search, setSearch ] = useState(null);
    const { docs } = useFirestore('images'); 

    // let searchWord = '';
    updateSearch = (e) => {
        // searchWord = e.target.value
        setSearch(e.target.value.toLowerCase());
        // console.log(docs[0].desc)
        for (let i of docs) {
            if (i.desc.includes(search)) {
                return i.url
            }
        }
    }
    // useEffect(() => {
    //     const results = docs.filter((doc) => {
    //         return console.log(doc.desc.toLowerCase().includes(searchWord.toLowerCase()));
    //     })
    //     setSearch(results);
    // }, [searchWord, docs])

    return (
        <div>
            <input type='search' 
                placeholder='search by descriptors'
                // value={search}
                onChange={updateSearch}
            />
        </div>
    )
}

export default SearchBox