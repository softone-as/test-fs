import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IPermission } from 'interface-models/iam/permission.interface';
import { UserIndexSchema } from '../user/user-index.contract';
import { z } from 'zod';

export const PermissionIndexSchema = UserIndexSchema.extend({});

export type TPermissionIndexSchema = z.infer<typeof PermissionIndexSchema>;

export type TCPermissionIndexProps = IPaginateResponse<IPermission>;
