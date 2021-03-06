import React from 'react';
import {withRouter } from "react-router-dom";

class Participant extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.id) {
            let conn = this.props.peer.connect(this.props.match.params.id);
            this.setupConnection(conn);
        }
    }

    componentDidUpdate(prevProps) {

    }

    setupConnection(connection) {
        // When connection established
        connection.on('open', () => {
            this.setState((state, props) => ({host: connection}));
        });

        connection.on('error', (err) => {
            console.error(err);
            // Try again
            if (this.props.id) {
                let conn = this.props.peer.connect(this.props.match.params.id);
                this.setupConnection(conn);
            }
        });

        connection.on('close', () => {
            // Disconnected from host
        });

        // Receive messages
        connection.on('data', (data) => {
            // this.receive(data, connection.peer);
        });
    }

    render() {
        return null;
    }
}

export default withRouter(Participant);