const Message = require("../models/message");

module.exports = (io) => {
  io.on("connection", (client) => {
    console.log("new connection");

    client.on("disconnection", () => {
      client.broadcast.emit("user disconnected");
      console.log("user disconnected");
    });

    client.on("message", (data) => {
      let messageAttributes = {
        content: data.content,
        userName: data.userName,
        user: data.userId,
      };
      m = new Message(messageAttributes);
      m.save()
        .then(() => {
          io.emit("message", messageAttributes);
        })
        .catch((error) => console.log(`error : ${error.message}`));
    });
  });

  Message.find({})
    .sort({ createAt: -1 })
    .limit(10)
    .then((message) => {
      client.emit("load all messages", message.reverse());
    });
};
