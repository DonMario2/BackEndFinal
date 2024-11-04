import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import exphbs  from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';

const Port = 8080;
const app = express();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(Port, () => {
    console.log('Server Activo en localhost: ', Port)
});

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());


const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user connected');
});

httpServer.listen(Port, () => {
    console.log('Server Activo en localhost: ', Port)
});