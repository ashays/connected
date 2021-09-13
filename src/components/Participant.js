import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Profile from './Profile';
import { LoadingSlide } from './Slides';
import { send, setupConnection} from './ConnectionHelpers';

function Participant(props) {
  const [host, setHost] = useState();
  const [name, _setName] = useState(undefined);
  const setName = (name) => {
    _setName(name)
    send(host, {
      type: "name",
      name
    });
  }

  useEffect(() => {
    if (!host) {
      setupConnection(props.peer, props.match.params.id, (connection) => { setHost(connection) });
      return (() => { host?.close(); });
    }
  });

  if (name) {
    return (<div>Welcome {name}. Your ID is {props.id}</div>);
  } else if (host) {
    return (
      <Profile id={props.id} updateName={setName} />
    );
  }
  return (<LoadingSlide message="Connecting to host"></LoadingSlide>);
}

export default withRouter(Participant);