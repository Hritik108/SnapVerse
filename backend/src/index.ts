import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = 3000;

// Body parsing middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res: express.Response) => {
	res.send('OK');
});

app.get('/test', (req: express.Request, res: express.Response) => {
	res.send('OK Test');
});

app.use('/api', routes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});