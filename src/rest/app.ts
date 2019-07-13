import express from 'express';
const app = express();


app.get('/', (req, res) => res.send('Hello World! - This is the argument engine'));


export default app;