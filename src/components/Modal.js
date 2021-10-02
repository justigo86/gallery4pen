import React, {useEffect} from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import useFirestore from '../firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import Tilt from 'react-tilt';

const OverlayContainer = styled.div`
    -moz-user-select: none;     //used to prevent picture highlighting blue when fast-clicking
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 10;
    & > .prev {
        position: fixed;
        top: 50vh;
        right: 5vw;
        font-size: 5vw;
        color: hsl(0, 0%, 100%);
        z-index: 10;
        cursor: pointer;
        /* user-select: none; */
    }
    & > .next {
        position: fixed;
        top: 50vh;
        left: 5vw;
        font-size: 5vw;
        color: hsl(0, 0%, 100%);
        z-index: 10;
        cursor: pointer;
        /* user-select: none; */
    }
    /* & > .target {} */
`
const Overlay = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsla(0, 0%, 30%, 0.6);
    -webkit-tap-highlight-color: transparent;
    &.js-loading *,                 //need to work with this more
    &.js-loading *:before,
    &.js-loading *:after {
        animation-play-state: paused !important;        //ensures animation plays in completion
    }
`
const OverlayImg = styled.img `
    display: block;
    max-width: 70%;
    max-height: 70%;
    margin: 20vh auto;
    box-shadow: 3px 5px 7px hsla(0, 0%, 0%, 0.5);
    border: 3px solid white;
    /* border-bottom: 50px solid white; */
`

//modal to show full-size images
const Modal = ({ currentImg, setCurrentImg }) => {    //prop used to display correct selected image in modal
    const { docs } = useFirestore('images');
    
    const handleClick = (e) => {        //create a function that allows user to close modal once opened
        if (e.target.classList.contains('target')) {   //set to allow user to click on modal img
            setCurrentImg(null);                        //modal will only close when user clicks outside of image
        }
    }

    const currentIndex = () => {        //function to pull current index of picture selected for modal
        for (let i in docs) {           //for all pictures in the 'images' collection
            if (currentImg === docs[i].url ) {    //find the index associated with the url of currentImg
                return docs[i]          //return index info
            }
        }
    }
    
    const prevSlide = () => {           //previous slide button
        let idx = currentIndex();       //pull index for current image
        if (idx === docs[0]) {          //if the index matches the first docs index
            setCurrentImg(docs[docs.length - 1].url)  //loop to last image in array on click
        } else {
            setCurrentImg(docs[docs.indexOf(idx) - 1].url)    //or subtract one position from index position
        }
    }
    const nextSlide = () => {
        let idx = currentIndex();
        if (idx === docs[docs.length - 1]) {
            setCurrentImg(docs[0].url)
        } else {
            setCurrentImg(docs[docs.indexOf(idx) + 1].url)
        }
    }

    useEffect( () => {          
            //allowing keypresses for cycling images
        const handleKeyDown = (e) => {
            if (e.keyCode === 37) {     //arrow left for previous image
                return prevSlide()
            } else if (e.keyCode === 39) {  //arrow right for next image
                return nextSlide()
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    })


    return (
        //use handleClick to allow user to close image modal
        <OverlayContainer >
                <Overlay key={' '} as={motion.div} 
                    // className={index === current ? 'target active' : 'target not-active'} 
                    className={ 'target' } 
                    onClick={handleClick}>
                        {/* <Tilt className="Tilt" options={{ max : 15 }} > */}
                            {/* <div className="Tilt-inner"> */}
                                <OverlayImg as={motion.img} src={currentImg} alt={`front and center ${currentIndex()}`} 
                                initial={ { rotate: 180, scale: 0, opacity: 0 } } 
                                animate={ { rotate: 360, scale: 1, opacity: 1 } }
                                transition={{ type: "spring", stiffness: 275, damping: 30 }} />
                            {/* </div> */}
                        {/* </Tilt> */}
                    <input type='text' id='descriptors'></input>
                </Overlay>
            <FontAwesomeIcon className='prev arrow' icon={faArrowAltCircleRight} onClick={nextSlide} />
            <FontAwesomeIcon className='next arrow' icon={faArrowAltCircleLeft} onClick={prevSlide} />
        </OverlayContainer>
    )
}

export default Modal;