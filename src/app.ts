import express, { Application, Request, Response } from 'express';
import path from 'path';
import { loadConfig } from './config/configLoader';
import db from './config/dbConfig';

// interfaces
import { Route } from './interfaces/interfaces';
// routes
import userRoutes from './routes/UserRoutes';

const routes: Route[] = [
    {
        url: '/api/v1/users',
        route: userRoutes
    }
];

// config
const configFilePath = path.join(__dirname, 'config', 'dev-config.yaml');
const config = loadConfig(configFilePath);

//
const app: Application = express();
const port = process.env.PORT || config.PORT;
const JWT_SECRET = config.JWT_SECRET;

// 요청값 포맷 설정
app.use(express.json());

// regist routes
routes.forEach((route) => {
    app.use(route.url, route.route);
});

app.listen(port, function () {
    console.log(`Application is listening on port ${port} !`);

    console.log('Database connection status: ', db);
});