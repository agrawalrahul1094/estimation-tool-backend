import {app} from './app';
import * as http from 'http';


const PORT = 8006;
const server = http.createServer(app);

server.listen(PORT);
server.on('listening', () => {
    console.log('Running app at ', PORT)
});
