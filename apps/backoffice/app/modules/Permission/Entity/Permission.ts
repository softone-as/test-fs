import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response';

export type FormPermissionType = Omit<PermissionResponse, 'id' | 'roles'>;
