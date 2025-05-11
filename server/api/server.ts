import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectToDb, getDb } from '../db';
import { Db } from 'mongodb';
import authRoutes from './routes/auth/auth.routes';
require('dotenv').config();

let db: Db;

const initializeServer = () => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(
    cors({
      origin: true,
      exposedHeaders: ['Authorization'],
    })
  );

  // Optional origin restriction middleware (when deployment)
  /*
  server.use((req: Request, res: Response, next: NextFunction) => {
    const allowedOrigin = 'https://YOUR_WEBSITE_LINK';
    const origin = req.headers.origin;

    if (!origin || origin !== allowedOrigin) {
      console.log(origin);
      return res.status(403).json({ error: 'Origin not allowed' });
    }

    next();
  });
  */

  server.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    next();
  });


  // routes goes here
  server.get('/', (req: Request, res: Response) => {
    res.send('IEEE sayes hello world!');
  });

  server.use('/auth', authRoutes);

  // ...

  return server;
};

let serverReady = (async (): Promise<express.Express> => {
  return new Promise((resolve, reject) => {
    connectToDb((err?: Error) => {
      if (err) {
        console.error('DB Connection Error:', err);
        return reject(err);
      }
      db = getDb();
      const server = initializeServer();
      console.log('Connected to DB and server ready.');
      resolve(server);
    });
  });
})();

serverReady
  .then((server) => {
    const PORT = Number(process.env.PORT) || 8081;
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server: ', error);
  });

// For Vercel deployment (serverless)
// export default async (req: Request, res: Response) => {
//   try {
//     const server = await serverReady;
//     return server(req, res);
//   } catch (err) {
//     return res.status(500).send('Server initialization failed.');
//   }
// };
