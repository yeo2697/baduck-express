import { Request, Response } from 'express';
// import { UserService } from '../services/UserService';

export class UserController {
    // private userService: UserService;

    constructor () {
        // this.userService = new UserService();
    }

    public async getExample (req: Request, res: Response): Promise <void> {
        try {
            // const data = await this.userService
            res.json({'data': 'Siuuuuuuu'});
        }
        catch (error) {
            console.error('Error in getExample: ', error);
            res
            .status(500)
            .send('Internal Server Error');
        }
    }
}