import React, { useState, useEffect } from 'react';
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

function App() {
  const [settings, updateSettings] = useState({});

  useEffect(() => {
    if (!settings.peer) {
      const peer = new Peer(Math.random().toString(36).substr(2, 5));
      peer.on("open", (id) => {
        console.log("My peer ID is: " + id);
        updateSettings({id, peer})
      });
      peer.on("error", (err) => {
        console.log(err);
      });
      return (() => { settings.peer?.disconnect(); });
    }
  });

  if (settings.id && settings.peer) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Presenter id={settings.id} peer={settings.peer} />
          </Route>
          <Route path="/join/:id">
            <Participant id={settings.id} peer={settings.peer} />
          </Route>
        </Switch>
      </Router>
    );
  }
  return (<LoadingSlide message="Loading session" />);
}

export default App;