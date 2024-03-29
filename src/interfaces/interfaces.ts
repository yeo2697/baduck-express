import { Router } from 'express';

export interface Route {
    url: string;
    route: Router;
}
