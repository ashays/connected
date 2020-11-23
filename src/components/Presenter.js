import React from 'react';
import { withRouter } from "react-router-dom";
import Toolbar from './Toolbar';
import { LandingSlide, LobbySlide, PollSlide } from './Slides';
import './Presenter.css';

class Presenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: undefined };
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
            let slide;
            switch (this.state.mode) {
                // case "":
                default:
                    slide = (<LobbySlide participants={this.state.participants} />);
            }
            return (
                <div>
                    {slide}
                    <Toolbar participants={this.state.participants} />
                </div>
            );
        }
        return (<LandingSlide id={this.props.id} />);
    }
}

export default withRouter(Presenter);