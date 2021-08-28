import React from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase/firebase_config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const Delete = styled.a `
    position: absolute;
    top: 5px;
    right: 10px;
    color: black;
    display: none;
    font-size: 24px;
    opacity: 0.4;
    transition: 200ms ease-in-out;
    &:hover {
        color: red;
        cursor: pointer;
        opacity: 1;
    }
`;

// doc={''} onClick={''}

const DeleteBtn = ({currentImg}) => {
    
    const handleClick = (e) => {   //create a function that allows user to close modal once opened
        if (e.target.classList.contains('picture')) {   //set to allow user to click on modal img
            firestore.collection('images').delete();   //modal will only close when user clicks outside of image
        }
    }

    return (
        <Delete onClick={handleClick}>
            <FontAwesomeIcon icon={faTimesCircle}/>
        </Delete>
    )
}

export default DeleteBtn
