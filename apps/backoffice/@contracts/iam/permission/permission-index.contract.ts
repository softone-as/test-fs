import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IPermission } from 'interface-models/iam/permission.interface';
import { z } from 'zod';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';

export const PermissionIndexSchema = IndexRequestSchema.extend({});

export type TPermissionIndexSchema = z.infer<typeof PermissionIndexSchema>;

export type TCPermissionIndexProps = IPaginateResponse<IPermission>;
