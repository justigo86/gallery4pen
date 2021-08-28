import React, {useState, useEffect} from 'react';
import useFirestore from '../firebase/firestore';
import { firestore } from '../firebase/firebase_config';
import styled from 'styled-components';

const SearchBox = ({ searchWord, updateSearch }) => {
    const [ search, setSearch ] = useState(null);
    const { docs } = useFirestore('images'); 

    // let searchWord = '';
    // updateSearch = (e) => {
    //     searchWord = e.target.value
    //     setSearch(searchWord);
    // }
    // useEffect(() => {
    //     const results = docs.filter((doc) => {
    //         return console.log(doc.desc.toLowerCase().includes(searchWord.toLowerCase()));
    //         // return console.log(doc.desc)
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