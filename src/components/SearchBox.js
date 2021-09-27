import React, {useState, useEffect} from 'react';
import useFirestore from '../firebase/firestore';
import { firestore } from '../firebase/firebase_config';
import styled from 'styled-components';

const SearchBox = ({ updateSearch }) => {
    const [ search, setSearch ] = useState(null);
    const { docs } = useFirestore('images'); 

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