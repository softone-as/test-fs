import { Module } from '@nestjs/common';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { DashbordController } from './controllers/dashboard.controller';
import { MainController } from './controllers/main.controller';

@Module({
    imports: [],
    controllers: [DashbordController, MainController],
    providers: [InertiaAdapter],
})
export class MainModule {}
