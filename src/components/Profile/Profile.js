import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    }
  }
  onFormChange = event => {
    switch(event.target.name){
      case 'user-name':
        this.setState({ name: event.target.value });
        break;
      case 'user-age':
        this.setState({ age: event.target.value });
        break;
      case 'user-pet':
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
      
    }
  }

  onProfileUpdate = data => {
    fetch(`http://localhost:3000/user/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput: data })
    })
    .then(resp => {
      if(resp.status == 200 || resp.status == 304){
        this.props.toggelModal();
        this.props.loadUser({ ...this.props.user, ...data })
      }
    })
    .catch(console.log);
  }
  render(){
    const {user} = this.props;
    const { name, age, pet } = this.state;
    return(
      <div className='profile_modal'>
       <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center couleur bg-white">
        <main className="pa4 black-80 w-80">
          <img
             src="http://tachyons.io/img/logo.jpg"
             className="h3 w3 dib" alt="avatar"
          />
          <h1>{this.state.name}</h1>
          <h4>{`Images submited : ${user.entries}`}</h4>
          <p>{`Member since :  ${new Date(user.joined).toLocaleDateString()}`}</p>
          <label className='mt2 fw6' htmlFor='user-name'>Name: </label>
          <input
            onChange={this.onFormChange}
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
          />

          <label className='mt2 fw6' htmlFor='user-age'>Age: </label>
          <input
            onChange={this.onFormChange}
            className="pa2 ba w-100"
            placeholder="56"
            type="text"
            name="user-age"
            id="age"
          />

          <label className='mt2 fw6' htmlFor='user-pet'>Pet: </label>
          <input
            onChange={this.onFormChange}
            className="pa2 ba w-100"
            placeholder="Dragon"
            type="text"
            name="user-pet"
            id="pet"
          />

          <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <button 
              onClick={() => this.onProfileUpdate({ name, age, pet })}
              className='b pa2 grow pointer hover-white w-40 bg-light-blue b--block-20'>
                  save
              </button>
              <button 
               className='b pa2 grow pointer hover-white w-40 bg-light-red b--block-20'
               onClick={this.props.toggelModal}
               >
                  cancel
              </button>
          </div>

        </main>
        <div className='x_modal' onClick={this.props.toggelModal}>&times;</div>
       </article>
     </div>
    )
  }
};

export default Profile;