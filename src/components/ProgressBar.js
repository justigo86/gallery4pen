import React, {useEffect} from 'react';
import useStorage from '../firebase/storage';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Progress = styled.div `
    height: 5px;
    background: blueviolet;
    margin-top: 20px;
`

const ProgressBar = ({ file, setFile}) => {     //using file and setFile as props for progress bar
    const { url, progress } = useStorage(file); //destructuring useStorage()

    useEffect(() => {
        if (url) {          //once the file has been uploaded, its url has been established
            setFile(null);  //set file state to null to remove progress bar
        }
    }, [url, setFile])      //url and setFile need to be set as dependencies

    return (
        <Progress as={motion.div} initial={ { width: 0 } } animate={ { width: progress + '%' }}></Progress>
        //display progress bar as file is being uploaded
    )
}

export default ProgressBar
