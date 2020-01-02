import cors from 'cors';
import app from './app';

app.use(cors());
app.listen(3335);
