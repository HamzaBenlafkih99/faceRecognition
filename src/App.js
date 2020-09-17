import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'e6c484508db04ac6843f76b58d4faf5a'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 250
      }
    }
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }
  calculFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) =>{
    this.setState({ input: event.target.value });
  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
    .predict(
       Clarifai.FACE_DETECT_MODEL, 
       this.state.input
    ).then(response=> this.displayFaceBox(this.calculFaceLocation(response)))
     .catch(err=> console.log(err.message));
  }

 render(){

  return (
    <div className="App">
      <Particles className='particles'
          params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit={ this.onButtonSubmit } />
      <FaceRecognition box= {this.state.box} imageUrl={ this.state.imageUrl } />
    </div>
  );
 }
}

export default App;
