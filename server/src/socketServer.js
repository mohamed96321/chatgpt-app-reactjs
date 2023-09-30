const { Server } = require('socket.io');
const { v4: uuid } = require('uuid');

let sessions = {};

const ChatGPT = "https://poe.com/ChatGPT";

const registerSocketServer = server => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected on ${socket.id}.`);

    socket.on('session-history', (data) => {
      sessionHistoryHandler(socket, data);
    });

    socket.on('conversation-message', (data) => {
      conversationMessageHandler(socket, data)
    });

    socket.on('conversation-delete', (data) => {
      conversationDeleteHandler(socket, data);
    });
  });
};

const sessionHistoryHandler = (socket, data) => {
  const { sessionId } = data;
  if (sessions[sessionId]) {
    // send existing session data back to user
    socket.emit('session-details', {
      sessionId,
      conversations: sessions[sessionId],
    });
  } else {
    const newSessionId = uuid();
    sessions[newSessionId] = [];
    const sessiondetails = {
      sessionId: newSessionId,
      conversations: [],
    };
    socket.emit("session-details", sessiondetails);
  }
};

const conversationMessageHandler = (socket, data) => {
  const { sessionId, message, conversationId } = data;
  if (sessions[sessionId]) {
    const aiMessage = {
      content: `Hello here is AI. It's just DUMMY AI, I can't help you now maybe in the future can help you.In the end, I will give you some useful resources and websites can help you to find what you want.First, it's ChatGPT website:- ${ChatGPT}`,
      id: uuid(),
      aiMessage: true,
    };

    const conversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );
    if (!conversation) {
      sessions[sessionId].push({
        id: conversationId,
        messages: [message, aiMessage],
      });
    }
    if (conversation) {
      conversation.messages.push(message, aiMessage);
    }

    const updateConversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    socket.emit('conversation-details', updateConversation);
  }
};

const conversationDeleteHandler = (_, data) => {
  const { sessionId } = data;
  if (sessions[sessionId]) {
    sessions[sessionId] = [];
  }
};

module.exports = { registerSocketServer };
