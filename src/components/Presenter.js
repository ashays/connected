import React from 'react';
import {withRouter } from "react-router-dom";

class Presenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {test: "hi"};
    }

    componentDidMount() {
        if (this.props.id) {
            this.props.peer.on('connection', (conn) => {
                this.setupParticipant(conn);
            });
        }
    }

    componentDidUpdate(prevProps) {

    }


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
            <div>Hop on over to {window.location.href + "join/" + this.props.id}.</div>
        );
    }
}

export default withRouter(Presenter);
