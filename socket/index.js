const io = require("socket.io")(8000, {
    cors: {
        origins: "*"
    }
});
let users = [];
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
};
const findUser = (userId) => users.find(user => user.userId === userId);
io.on("connection", (socket) => {
    console.log('A user connected', socket.id)
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    });

    //messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log('receiver', receiverId)
        const user = findUser(receiverId);
        console.log('user', user);
        io.to(user.socketId).emit("getMessage", {
            senderId, text
        });
    });

    //typing
    socket.on("typing", ({ senderId, receiverId, text, conversationId }) => {
        const user = findUser(receiverId);
        io.to(user.socketId).emit("typing", {
            senderId, receiverId, text, conversationId
        });
    });



    //disconnect
    socket.on("disconnect", () => {
        console.log('User disconnected')
        removeUser(socket.id);
        io.emit("getUsers", users)
    });
});