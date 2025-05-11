"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../db");
require('dotenv').config();
let db;
const initializeServer = () => {
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use((0, cors_1.default)({
        origin: true,
        exposedHeaders: ['Authorization'],
    }));
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
    server.use((req, res, next) => {
        console.log(req.url);
        next();
    });
    // routes goes here
    server.get('/', (req, res) => {
        res.send('IEEE sayes hello world!');
    });
    // ...
    return server;
};
let serverReady = (() => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (0, db_1.connectToDb)((err) => {
            if (err) {
                console.error('DB Connection Error:', err);
                return reject(err);
            }
            db = (0, db_1.getDb)();
            const server = initializeServer();
            console.log('Connected to DB and server ready.');
            resolve(server);
        });
    });
}))();
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
