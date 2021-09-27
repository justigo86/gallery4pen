import React, {useState} from 'react';
import UploadForm from './components/UploadForm';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import SearchBox from './components/SearchBox';

const Title = styled.h1 `
  text-align: center;
  color: white;
`

const Body = styled.div `
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-family: 'Quicksand', sans-serif; */
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;   //used to prevent double-click highlighting
  & > .particles {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
`

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: false
      }
    },
    polygon: {
      nb_sides: 5
    },
    size: {
      value: 10,
      random: true
    },
    opacity: {
      value: 1
    },
    move: {
      direction: 'bottom',
      out_mode: 'out',
      bounce: false
    },
    line_linked: {
      enable: false
    }
  }
}

const App = () => {
  // const [ pics, searchfield ] = useState([]);
  const [ currentImg, setCurrentImg ] = useState(null); //state for images as they enter modal
  // const { docs } = useFirestore('images');

  // const filterImages = () => {
  //   const checkbox = document.getElementById('checkbox');
  //   if (checkbox.checked === true) {
  //     currentImg.filter((image) => {
  //       image.desc.includes('fav')
  //     });
  //   } else {
  //     setCurrentImg()
  //   }
  // }

  return ( 
    // !pics.length ?
    // <h1>Loading...</h1> :

    <Body>
      <Particles className="particles" params={particlesOptions} />
      <Title >Gallery4Pen</Title> 
      <UploadForm />
      {/* <input type='checkbox' id='checkbox'>Favorite</input> */}
      {<Gallery setCurrentImg={setCurrentImg} />}
        {/* setCurrentImg used as prop for modal functionality */}
      {currentImg && <Modal currentImg={currentImg} setCurrentImg={setCurrentImg} /> }
        {/* image only renders when selected - currentImg and setCurrentImg used as props within Modal for click function */}
    </Body>
  )
}
export default App;