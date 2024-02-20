import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IRole } from 'interface-models/iam/role.interface';
import { z } from 'zod';

export const RoleIndexSchema = IndexRequestSchema.extend({});

export type TRoleIndexSchema = z.infer<typeof RoleIndexSchema>;

export type TCRoleIndexProps = IPaginateResponse<IRole>;
