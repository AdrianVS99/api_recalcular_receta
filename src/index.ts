import express from 'express';
import recipeRouter from './routes/recipe';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here!! ' + new Date().toLocaleString());
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use('/recipe', recipeRouter);
