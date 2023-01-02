import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegionIndexApplication } from './applications/region-index.application';
import { RegionController } from './controllers/v1/region.controller';
import { City } from 'entities/region/city.entity';
import { District } from 'entities/region/district.entity';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { RegionService } from './services/region.service';
import { RegionApplication } from './applications/region.application';

@Module({
    imports: [TypeOrmModule.forFeature([City, District]), CacheModule],
    controllers: [RegionController],
    providers: [RegionIndexApplication, RegionService, RegionApplication],
    exports: [RegionService],
})
export class RegionModule {}
