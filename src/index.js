import 'dotenv/config';
import express from 'express';
import routers from './Routers/routers.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use('/list', routers);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});