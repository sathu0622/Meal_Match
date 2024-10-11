const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./route/mealRoute');
const orpRoutes = require('./route/OrphanageRqRoute')
const ratingRoutes = require('./route/ratingRoutes');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

app.use(express.json());
app.use(cors());

app.use('/api', mealRoutes);
app.use('/api', orpRoutes);
app.use('/api/rating', ratingRoutes);

const restaurantLocation = { latitude: 6.9035, longitude: 79.9538 };
const deliveryLocation = { latitude: 6.9147, longitude: 79.9729 };

app.get('/restaurant-location', (req, res) => {
    res.json(restaurantLocation);
});

io.on('connection', (socket) => {
    console.log('Client connected');

    // Emit the delivery location immediately when the client connects
    socket.emit('locationUpdate', deliveryLocation);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

mongoose.connect('mongodb+srv://spm:IhateSliit31@cluster0.fl3zzyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
