export function send(connection, data) {
  connection.send(data);
}

export function setupConnection(me, connectToId, onSuccess) {
  let connection = me.connect(connectToId);

  // When connection established
  connection.on('open', () => {
    onSuccess(connection)
  });

  connection.on('error', (err) => {
    console.error(err);
    // Try again
    setupConnection(me, connectToId, onSuccess);
  });

  connection.on('close', () => {
    console.log("disconnected from host");
    // Disconnected from host
  });

  // Receive messages
  connection.on('data', (data) => {
    // this.receive(data, connection.peer);
  });
}

export function participantManager(participants, action) {
  let updatedParticipants = { ...participants }
  switch (action.type) {
    case 'add':
      // Requires action.connection
      return { ...participants, [action.connection.peer]: {connection: action.connection, name: undefined} }
    case 'remove':
      // Requires action.id
      delete updatedParticipants[action.id]
      return updatedParticipants
    case 'rename':
      // Requires action.id and action.name
      if (participants[action.id]) {
        updatedParticipants[action.id].name = action.name;
      }
      return updatedParticipants
    default:
      throw new Error();
  }
}