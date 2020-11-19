import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Lobby from './components/Lobby';
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
    peer.on('connection', (conn) => {
      this.setupParticipant(conn);
    });
  }

  componentWillUnmount() {
    this.state.peer.disconnect();
  };

  setupParticipant(connection) {
    // When connection established
    connection.on('open', () => {
      this.setState((state, props) => ({
        connections: {...state.connections, [connection.peer]: connection}, 
        participants: {...state.participants, [connection.peer]: {name: undefined}}
      }), () => {
        // What to do after making connection
      });
    });

    connection.on('error', (err) => {
      console.error(err);
    });

    connection.on('close', () => {
      this.setState((state, props) => {
        let connections = {...state.connections};
        let participants = {...state.participants};
        delete connections[connection.peer];
        delete participants[connection.peer];
        return ({connections, participants});
      }, () => {
        // What to do after a connection is closed
      });
    });

    // Receive messages
    connection.on('data', (data) => {
      // this.receive(data, connection.peer);
    });
  }


  render() {
    return (
      <Router>
        {this.state.id &&
          <Switch>
            <Route exact path="/">            
              <div>Hi! My ID is {this.state.id}</div>
            </Route>
            <Route path="/join/:id">
              <Lobby id={this.state.id} peer={this.state.peer} />
            </Route>
          </Switch>
        || 
          <div>Loading</div>
        }
      </Router>
    );  
  }
}

export default App;