import express, {Application} from 'express';
import bodyParser from 'body-parser';
import { costumerRouter } from './routes/costumers';
import { prisma } from './prismaClient/prisma';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/costumers', costumerRouter);

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error connect to the database', error);
  }
});