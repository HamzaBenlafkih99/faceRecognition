import React from 'react';

class Signin extends React.Component {
  constructor(){
    super();
    this.state = {
      emailSignIn: '',
      passwordSignIn: ''
    }
  }
  
  onChangeEmailInput = event => {
    this.setState({ emailSignIn: event.target.value });
  }

  onChangePasswordInput = event => {
    this.setState({ passwordSignIn: event.target.value });
  }

  saveAuthTokenSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitForm = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.emailSignIn,
        password: this.state.passwordSignIn
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.userId && data.success === 'true'){
        this.saveAuthTokenSession(data.token);
        fetch(`http://localhost:3000/user/${data.userId}`, {
          method: 'get',
          headers: {
           'Content-Type': 'application/json',
           'Authorization': data.token
          }
        })
        .then(resp => resp.json())
        .then(user => {
          if(user && user.email){
            this.props.loadUser(user);
            this.props.onRouteChange('home')
          }
        })
      }
    })

  }

  render(){
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center couleur">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange= { this.onChangeEmailInput }
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={ this.onChangePasswordInput }
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={()=> this.onSubmitForm()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}


export default Signin;