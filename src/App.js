import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 280
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxs: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: ''
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    } 
    })
  }

  calculateFaceLocation = data => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions.map(region => {
      const position = region.region_info.bounding_box
      return {
        leftCol: position.left_col * width,
        topRow: position.top_row * height,
        rightCol: width - (position.right_col * width),
        bottomRow: height - (position.bottom_row * height)
      }
    })
    return clarifaiFace;
  }

  displayFaceBox = boxs => {
    this.setState({ boxs });
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
      this.setState({ imageUrl: this.state.input });
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
       .then(response => response.json())
       .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
         this.displayFaceBox(this.calculateFaceLocation(response))
        }
        )
        .catch(err => console.log(err));
  }

  onRouteChange = route => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggelModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

 render(){
  return (
    <div className="App">
      <Particles className='particles'
          params={particlesOptions}
      />
      <Navigation isSignedIn={this.state.isSignedIn} 
        onRouteChange={this.onRouteChange}
        toggelModal={this.toggelModal}
      />
      {this.state.isProfileOpen && 
        <Modal>
           <Profile 
           isProfileOpen={this.state.isProfileOpen} 
           toggelModal={this.toggelModal}
           user={this.state.user}
           loadUser= {this.loadUser}
           />
        </Modal>
      }
      {
        this.state.route === 'home' ?
        <div>
          <Logo />
          <Rank name= {this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition boxs={this.state.boxs} imageUrl={this.state.imageUrl} />
        </div>
        :(
          this.state.route === 'signin' ?
           <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
           <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
          
    </div>
  );
 }
}

export default App;
