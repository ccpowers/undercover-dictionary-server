import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
// Set up CORS for your Express app
app.use(cors());
const server = createServer(app);


// define messages
const enum DictionaryMessages {
    NEW_PLAYER='new_player',
    START_GAME='start_game',
    GAME_OVER='game_over',
    PLAYER_GUESS='player_guess',
    PLAYER_QUESTION='player_question'
}

// Set up CORS for socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // This is the domain of your React client
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"], // wat
    credentials: true
  }
});


// import game
import { addPlayer } from './game';

io.on('connection', (socket: Socket) => {
  console.log('a user connected', socket.id);

  socket.on('client chat message', (msg: string) => {
    console.log('emitting msg', msg);
    io.emit('server chat message', 'server ' + msg);
  });
  socket.on(DictionaryMessages.NEW_PLAYER, (player: string) => {
    console.log('adding new player ', player);
    const result = addPlayer(player);
    // todo how to send result back to client?
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
