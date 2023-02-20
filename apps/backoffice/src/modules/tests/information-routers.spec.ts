import { Route } from '../../../app/Enums/Route';
import dotenv from 'dotenv';
import request from 'supertest';

dotenv.config();

describe(__filename, () => {
    it('Matching all routers frontend to backend', async () => {
        const response = await request(process.env.HOST_BACKOFFICE).get(
            '/informations/get-all-routers',
        );

        const routersFrontend = Object.values(Route);
        const routersBackend = response.body as string[];

        let isMatch = true;

        routersFrontend.forEach((router) => {
            if (!routersBackend.includes(router)) isMatch = false;
        });

        expect(isMatch).toEqual(true);
    });
});
