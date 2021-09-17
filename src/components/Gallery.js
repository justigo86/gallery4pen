import React, {useState} from 'react';
import useFirestore from '../firebase/firestore';
import { firestore } from '../firebase/firebase_config';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faHeart } from '@fortawesome/free-regular-svg-icons';

const ImgGallery = styled.div `
    display: flex;
    flex-wrap: wrap;
`;
const DeleteBtn = styled.a `
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
const FavBtn = styled.a `
    position: absolute;
    top: 5px;
    left: 10px;
    /* color: black; */
    display: none;
    font-size: 24px;
    opacity: 0.4;
    transition: 200ms ease-in-out;
    &:hover {
        color: purple;
        cursor: pointer;
        opacity: 1;
    }
`;
const ContainerImg = styled.img `
    /* width: 600px;
    height: auto; */
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
    &:last-child {
        flex-grow: 10;
    }
    &:hover {
        cursor: pointer;
        opacity: 1;
        transition: transform 200ms ease-in-out;
        transform: scale(1.05);
        transform-origin: center;
    }
`;
const ImgContainer = styled.div `
    /* display: flex;
    justify-content: center;
    width: 300px;
    height: 300px;
    line-height: 0;
    column-gap: 0px; */
    margin: .1vh .1vw;
    position: relative;
    height: 40vh;
    width: auto;
    flex-grow: 1;
    overflow: hidden;
    opacity: .85;
    &:hover {
        opacity: 1;
    }
    &:hover ${DeleteBtn} {
        display: block;
        z-index: 1;
    } 
    &:hover ${FavBtn} {
        display: block;
        z-index: 1;
    } 
`;

const Gallery = ( { currentImg, setCurrentImg }) => {       //insert setCurrentImg as prop (destructured) for modal functionality
    const { docs } = useFirestore('images');    //the images uploaded will be passed through firestore hook for data collection
    const [toggle, setToggle] = useState(false);

    // const toggleFavorite = (e) => {
    //     // console.log(e.target)
    //     if (e.target.style.color === "red") {
    //         e.target.style.color = "black"
    //     } else {
    //         e.target.style.color = "red";
    //         e.target.style.opacity = "1";
    //     }
    // }

    return (
        //container wrapped around gallery containing array of uploaded images using the image urls - also use url for onClick for modal
            // layout, initial, animate, transition are used for framer-motion animations
        <ImgGallery>
            { docs && docs.map(doc => (
                <ImgContainer as={motion.div} 
                key={doc.id} 
                onClick={() => {
                    setCurrentImg(doc.url)
                }}
                layout>
                    <DeleteBtn onClick={(e) => {
                        e.stopPropagation();        //stops modal from popping up when deleting image
                        firestore.collection('images').doc(doc.id).delete();    //delete image
                    }}>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </DeleteBtn> 
                    <FavBtn onClick={(e) => {
                        e.stopPropagation();        //stops modal from popping up when deleting image
                        // toggleFavorite(e);
                        if (doc.desc.includes(' fav')){
                            doc.desc = doc.desc.replace(' fav', '')
                            e.target.style.color = 'black'
                        } else {
                            doc.desc += ' fav'
                            e.target.style.color = 'red'
                        }
                        console.log(doc.desc);
                    }}
                        toggle={setToggle}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </FavBtn> 
                    <ContainerImg as={motion.img} src={doc.url} alt="has been uploaded by user"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    transition={ { delay: 1 } }/>
                </ImgContainer>
            ))}
        </ImgGallery>
    )
}

export default Gallery