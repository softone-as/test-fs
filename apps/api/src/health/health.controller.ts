import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
    @Get()
    healthCheck(@Res() res: Response): any {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'API OK',
            timestamp: Date.now(),
        };

        try {
            res.send(healthcheck);
        } catch (_) {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).send(
                'API Service Unavailable',
            );
        }
    }
}
