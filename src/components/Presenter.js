import React, { useState, useEffect, useReducer } from 'react';
import { withRouter } from "react-router-dom";
import Toolbar from './Toolbar';
import { LandingSlide, LobbySlide } from './Slides';
import { participantManager } from './ConnectionHelpers';
import './Presenter.css';

function Presenter(props) {
  const [mode, setMode] = useState();
  const [participants, updateParticipants] = useReducer(participantManager);

  useEffect(() => {
    props.peer.on('connection', (conn) => {
      conn.on('open', () => {
        updateParticipants({type: 'add', connection: conn})
      });
    
      conn.on('close', () => {
        updateParticipants({type: 'remove', id: conn.peer})
      });

      conn.on('error', (err) => {
        console.error(err);
      });

      conn.on('data', (data) => {
        console.log("Received ", data);
        console.log("From ", conn.peer);
        if (data.type === 'name') {
          updateParticipants({type: 'rename', id: conn.peer, name: data.name})
        }
      });
    });
  }, [props.peer]);

  if (participants) {
    let slide;
    switch (mode) {
      // case "":
      default:
        slide = (<LobbySlide participants={participants} />);
    }
    return (
      <div>
        {slide}
        <Toolbar participants={participants} />
      </div>
    );
  }
  return (<LandingSlide id={props.id} />);
}

export default withRouter(Presenter);