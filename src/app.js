import "dotenv/config"
import express from "express"
import cors from "cors"
import messageRoute from "./routes/message.routes.js"
import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const port = process.env.PORT || 3001
const app = express()
const client = new Client();

app.use(cors())
app.use(express.json())
app.use(express.static('tmp'))
app.use(`/api/messages`, messageRoute(client))


client.on('ready', () => {
    app.listen(port, () => console.log(`Ready...${port}`));
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.initialize();
