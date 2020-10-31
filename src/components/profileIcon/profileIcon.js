import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(state => ({
            dropdownOpen: !state.dropdownOpen
        }))
    }
    render(){
        return(
        <div className='pa4 tc'>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
               <DropdownToggle
                  tag="span"
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpen}
                >
                  <img
                    src="http://tachyons.io/img/logo.jpg"
                   className="br-100 ba h3 w3 dib" alt="avatar"
                  />
               </DropdownToggle>
               <DropdownMenu right className='b--transparent shadow-s' style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                 <DropdownItem onClick={this.props.toggelModal} >View Profile</DropdownItem>
                 <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Signout</DropdownItem>
              </DropdownMenu>
           </Dropdown>
        </div>
        )
    }
}

export default ProfileIcon;