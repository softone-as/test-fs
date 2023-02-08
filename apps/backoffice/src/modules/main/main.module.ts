import { Module } from '@nestjs/common';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { DashbordController } from './controllers/dashboard.controller';
import { MainController } from './controllers/main.controller';
import { SampleController } from './controllers/sample.controller';

@Module({
    imports: [],
    controllers: [DashbordController, MainController, SampleController],
    providers: [InertiaAdapter],
})
export class MainModule {}
