import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TaskFlow API listening on port ${PORT}`);
});
