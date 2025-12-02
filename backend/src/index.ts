import express from 'express';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.handler.js';
import cors from 'cors';

const app = express();
const port = 8000;

// enable CORS for all origins (or configure origins)
app.use(cors());

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
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});