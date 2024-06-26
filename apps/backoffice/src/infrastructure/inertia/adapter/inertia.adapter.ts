import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IRenderInertia } from '../entities/render.inertia';
import { config } from '../../../config';
import { Utils } from '../../../common/utils/util';

@Injectable()
export class InertiaAdapter {
    constructor(@Inject(REQUEST) private request: any) {}

    render<T extends Record<string, any> | undefined>(
        component: string,
        props: T | null,
        statusCode = HttpStatus.OK,
    ): T {
        // merge component and props
        const renderData: IRenderInertia<T | any> = {
            component: component,
            props: props,
        };
        return this.request.Inertia.setViewData({ title: config.appName })
            .setStatusCode(statusCode)
            .render(renderData);
    }

    share(data: any): void {
        return this.request.Inertia.setViewData({
            title: config.appName,
        }).shareProps(data);
    }

    headers(data: any): void {
        return this.request.Inertia.setViewData({
            title: config.appName,
        }).setHeaders(data);
    }

    redirect(url: string): void {
        return this.request.Inertia.setViewData({
            title: config.appName,
        }).redirect(url);
    }

    successResponse(path: string, message: string): void {
        this.request.session.success = {
            message: message,
            statusCode: HttpStatus.OK,
        };

        return this.redirect(Utils.pathToUrl(path));
    }

    failResponse(path: string, message: string): void {
        this.request.session.error = {
            error: null,
            message: message,
            statusCode: HttpStatus.BAD_REQUEST,
        };

        return this.redirect(Utils.pathToUrl(path));
    }
}
