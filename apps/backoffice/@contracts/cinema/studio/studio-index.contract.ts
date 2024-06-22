import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IStudio } from 'interface-models/movie/studio.interface';
import { z } from 'zod';

export const StudioIndexSchema = IndexRequestSchema.extend({});

export type TStudioIndexSchema = z.infer<typeof StudioIndexSchema>;

export type TCStudioIndexProps = IPaginateResponse<IStudio>;
