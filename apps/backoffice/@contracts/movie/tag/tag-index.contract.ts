import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { ITag } from 'interface-models/movie/tag.interface';
import { z } from 'zod';

export const TagIndexSchema = IndexRequestSchema.extend({});

export type TTagIndexSchema = z.infer<typeof TagIndexSchema>;

export type TCTagIndexProps = IPaginateResponse<ITag>;
