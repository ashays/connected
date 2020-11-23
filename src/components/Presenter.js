import React from 'react';
import { withRouter } from "react-router-dom";
import './Presenter.css';

class Presenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { test: "hi" };
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
                connections: { ...state.connections, [connection.peer]: connection },
                participants: { ...state.participants, [connection.peer]: { name: undefined } }
            }), () => {
                // What to do after making connection
            });
        });

        connection.on('error', (err) => {
            console.error(err);
        });

        connection.on('close', () => {
            this.setState((state, props) => {
                let connections = { ...state.connections };
                let participants = { ...state.participants };
                delete connections[connection.peer];
                delete participants[connection.peer];
                return ({ connections, participants });
            }, () => {
                // What to do after a connection is closed
            });
        });

        // Receive messages
        connection.on('data', (data) => {
            this.receive(data, connection.peer);
        });
    }

    receive(data, sender) {
        switch (data.type) {
            case "log":
                console.log(data.message)
                break;
            // case "chat":
            //     this.addToChat(data.message, sender);
            //     break;
            // case "announcement":
            //     this.setState((state, props) => ({ chat: [...state.chat, { message: data.announcement }] }));
            //     break;
            // case "sync":
            //     this.setState({ [data.prop]: data.data });
            //     break;
            // case "sound":
            //     let tingAudio = new Audio(ting);
            //     tingAudio.play();
            //     break;
            // case "redirect":
            //     this.props.history.push(data.location);
            //     break;
            case "name":
                let participants = { ...this.state.participants };
                if (participants[sender]) {
                    participants[sender].name = data.name;
                    this.setState({ participants });
                }
                break;
            default:
                console.log("Received ", data);
        }
    }

    render() {
        if (this.state.participants) {
            const participantsListed = Object.entries(this.state.participants).map((entry, i) => (
                <div key={entry[0]}>{entry[1].name ? entry[1].name : "Unnamed Person " + i}</div>
            ));
            return (
                <div className="slide slideB">
                    <main>
                        <h1>Nice! Wasn’t that easy?</h1>
                        {participantsListed}
                        <div className="subtitle">Join on another device for even more fun, or choose a demo below</div>
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
