module.exports = (io) => {
  io.on("connection", (client) => {
    console.log("new connection");

    client.on("disconnection", () => {
      console.log("user disconnected");
    });

    client.on("message", () => {
      io.emit("message", {
        content: "Hello",
      });
    });
  });
};
