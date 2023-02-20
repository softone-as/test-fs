import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../../Enums/Route';

export const sendEmailForgotPassword = (loginData): void => {
    Inertia.post(Route.AuthForgotPassword, loginData);
};
