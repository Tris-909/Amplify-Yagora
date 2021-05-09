import React from "react";
import { Auth, Hub } from 'aws-amplify'; 
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MarketPage from './pages/MarketPage';
import ProfilePage from './pages/ProfilePage';  
import Navbar from './components/Navbar';

import "./App.css";

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.getUserData();
    Hub.listen('auth', this, 'onHubCapsule');
  }

  getUserData = () => {
    Auth.currentAuthenticatedUser().then((result) => {
      this.setState({
        user: result
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  onHubCapsule = (capsule) => {
    switch(capsule.payload.event) {
      case "signIn":
        console.log('SIGN IN');
        this.getUserData();
        break;
      case "signUp":
        console.log('SIGNED UP');
        break;
      case "signOut":
        console.log("SIGNED OUT");
        this.setState({
          user: null 
        });
        break;
      default: 
        return;
    }
  }

  signOut = () => {
    return Auth.signOut();
  }

  render() {
    const { user } = this.state;

    return !user ? (
      <Authenticator theme={theme} />
    ) : (
      <Router>
        <>  
          <Navbar user={user}  signOut={this.signOut} />
          <div className="app-container">
            <Route component={HomePage} path="/" exact  />
            <Route component={ProfilePage} path="/profile" />
            <Route component={({ match }) => <MarketPage marketId={match.params.marketId} />} path="/market/:marketId" />
          </div>
        </>
      </Router>
    )
  }
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--squidInk)",
    color: "white"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
}

// export default withAuthenticator(App, true, [], null, theme);

export default App;