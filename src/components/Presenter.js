import React from 'react';
import {withRouter } from "react-router-dom";
import './Presenter.css';

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
        if (this.state.participants) {
            return (
                <div className="slide slideB">
                    <main>
                        <h1>Nice! Wasn’t that easy?</h1>
                        <div className="subtitle">Join on another device for even more fun, or choose a demo bellow</div>
                    </main>
                </div>
            );
        }
        return (
            <div className="slide">
                <main>
                    <h1>Let’s make presentations smarter, more engaging, and interactive</h1>
                    <div className="subtitle">Hop on your phone and give it a try—</div>
                    <div className="link">{window.location.href + "join/" + this.props.id}</div>
                </main>
            </div>
        );
    }
}

export default withRouter(Presenter);
