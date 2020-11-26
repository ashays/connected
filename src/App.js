import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Presenter from './components/Presenter';
import Participant from './components/Participant';
import { LoadingSlide } from './components/Slides';
import Peer from 'peerjs';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined
    };
  }

  componentDidMount() {
    const peer = new Peer(Math.random().toString(36).substr(2, 5));
    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      this.setState({ id, peer });
    });
    peer.on("error", (err) => {
      console.log(err);
    });
  }

  componentWillUnmount() {
    this.state.peer.disconnect();
  };


  render() {
    if (this.state.id) {
      return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Presenter id={this.state.id} peer={this.state.peer} />
            </Route>
            <Route path="/join/:id">
              <Participant id={this.state.id} peer={this.state.peer} />
            </Route>
          </Switch>
        </Router>
      );  
    }
    return (<LoadingSlide message="Loading session" />);
  }
}

export default App;