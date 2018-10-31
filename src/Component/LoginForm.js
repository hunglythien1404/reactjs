import React from 'react';
import Google from 'react-google-login';
import {GoogleLogout} from 'react-google-login';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isLogin: false
    };
  }

  //get email from data Google respone when sucess and change isLogin status
  success = (res) => {
    this.setState({
      email: res.profileObj.email,
      isLogin: true
    }, () => {
      this.props.isLogin(this.state.isLogin);
    });
  };


  //logout and change isLogin status
  handleLogout = () => {
    this.setState({
      email: null,
      isLogin: false
    }, () => {
      this.props.isLogin(this.state.isLogin);
    });
  };

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">
        <div className="ml-5">
          {this.state.email ?
            <div>
              <p className="text-primary col-3">{this.state.email}</p>
              <GoogleLogout buttonText="Log out" onLogoutSuccess={this.handleLogout}/>
            </div> :
            <Google  onSuccess={this.success} onFailure={this.fail}
                     clientId={"585040575848-obhv1ueadrmmp5787n1phh8bhul7hd2v.apps.googleusercontent.com"}/>
          }
        </div>
      </div>
    );
  }
}

export default LoginForm;