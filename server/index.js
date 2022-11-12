var app = require('express')();
const cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

app.use(cors());

app.get('/view', (req, res) => {
    res.sendFile(__dirname + '/display.html');
});

io.on('connection', (socket) => {

    // Triggered when user trying to join a room
    socket.on('join-room', (roomId, callback) => {
        socket.join(roomId);
        console.log("User : " + socket.id + "has joined in a room : " + roomId);

        callback();
    });

    // Triggered repetitively per interval time to update the Remote Desktop video FPS
    socket.on("screen-data", function (data) {
        data = JSON.parse(data);
        var room = data.room;
        var imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data-recieve', imgStr);
    });

    // EVENTS
    socket.on("mouse-move", function (data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-move-recieve", data);
    });

    socket.on("mouse-click", function (data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-click-recieve", data);
    });

    socket.on("keyboard-type", function (data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("keyboard-type-recieve", data);
    });
    // END OF EVENTS

    // Trigger when the socket connection got disconnected
    socket.on('disconnect', function (reason) {
        console.log(reason);
        if (reason === "ping timeout") { }
    });
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : " + server_port);
})