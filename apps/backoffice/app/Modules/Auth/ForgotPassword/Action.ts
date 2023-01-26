import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../../Enums/Route';

export const sendEmailForgotPassword = (loginData): void => {
    Inertia.post(EndpointRoute.ForgotPassword, loginData);
};
