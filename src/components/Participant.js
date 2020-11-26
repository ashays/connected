import React from 'react';
import { withRouter } from "react-router-dom";
import Profile from './Profile';
import { LoadingSlide } from './Slides';

class Participant extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
        this.state = { name: undefined };
    }

    componentDidMount() {
        if (!this.state.host) {
            let conn = this.props.peer.connect(this.props.match.params.id);
            this.setupConnection(conn);
        }
    }

    componentDidUpdate(prevProps) {

    }

    send(data) {
        this.state.host.send(data);
    }

    setupConnection(connection) {
        // When connection established
        connection.on('open', () => {
            this.setState((state, props) => ({ host: connection }));
        });

        connection.on('error', (err) => {
            console.error(err);
            // Try again
            let conn = this.props.peer.connect(this.props.match.params.id);
            this.setupConnection(conn);
        });

        connection.on('close', () => {
            // Disconnected from host
        });

        // Receive messages
        connection.on('data', (data) => {
            // this.receive(data, connection.peer);
        });
    }

    updateName(name) {
        this.setState({ name });
        this.send({
            type: "name",
            name
        });
    }

    render() {
        if (this.state.name) {
            return (<div>Welcome {this.state.name}. Your ID is {this.props.id}</div>);
        } else if (this.state.host) {
            return (
                <Profile id={this.props.id} updateName={this.updateName} />
            );
        } else {
            return (<LoadingSlide message="Connecting to host"></LoadingSlide>);
        }
    }
}

export default withRouter(Participant);