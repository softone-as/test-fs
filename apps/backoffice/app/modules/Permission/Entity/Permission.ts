import { RoleType } from '../../Role/Entity/Role';

export type PermissionType = {
    id: string;
    name: string;
    key: string;
    roles: Omit<RoleType, 'permissions'>[];
};

export type FormPermissionType = Omit<PermissionType, 'id' | 'roles'>;

// BACKOFFICE
export const PERMISSION_BACKOFFICE_SHOW_DASHBOARD = 'backoffice-show-dashboard';

export const PERMISSION_BACKOFFICE_SHOW_PRODUCT = 'backoffice-show-product';
export const PERMISSION_BACKOFFICE_DETAIL_PRODUCT = 'backoffice-detail-product';
export const PERMISSION_BACKOFFICE_UPDATE_PRODUCT = 'backoffice-update-product';
export const PERMISSION_BACKOFFICE_CREATE_PRODUCT = 'backoffice-create-product';
export const PERMISSION_BACKOFFICE_DELETE_PRODUCT = 'backoffice-delete-product';

export const PERMISSION_BACKOFFICE_SHOW_CONTENT = 'backoffice-show-content';
export const PERMISSION_BACKOFFICE_DETAIL_CONTENT = 'backoffice-detail-content';
export const PERMISSION_BACKOFFICE_UPDATE_CONTENT = 'backoffice-update-content';
export const PERMISSION_BACKOFFICE_CREATE_CONTENT = 'backoffice-create-content';
export const PERMISSION_BACKOFFICE_DELETE_CONTENT = 'backoffice-delete-content';

export const PERMISSION_BACKOFFICE_SHOW_WARNING = 'backoffice-show-warning';
export const PERMISSION_BACKOFFICE_DETAIL_WARNING = 'backoffice-detail-warning';
export const PERMISSION_BACKOFFICE_UPDATE_WARNING = 'backoffice-update-warning';
export const PERMISSION_BACKOFFICE_CREATE_WARNING = 'backoffice-create-warning';
export const PERMISSION_BACKOFFICE_DELETE_WARNING = 'backoffice-delete-warning';

export const PERMISSION_BACKOFFICE_SHOW_BASE = 'backoffice-show-base';
export const PERMISSION_BACKOFFICE_DETAIL_BASE = 'backoffice-detail-base';
export const PERMISSION_BACKOFFICE_UPDATE_BASE = 'backoffice-update-base';
export const PERMISSION_BACKOFFICE_CREATE_BASE = 'backoffice-create-base';
export const PERMISSION_BACKOFFICE_DELETE_BASE = 'backoffice-delete-base';

export const PERMISSION_BACKOFFICE_SHOW_CONFIG = 'backoffice-show-config';
export const PERMISSION_BACKOFFICE_DETAIL_CONFIG = 'backoffice-detail-config';
export const PERMISSION_BACKOFFICE_UPDATE_CONFIG = 'backoffice-update-config';
export const PERMISSION_BACKOFFICE_CREATE_CONFIG = 'backoffice-create-config';
export const PERMISSION_BACKOFFICE_DELETE_CONFIG = 'backoffice-delete-config';

export const PERMISSION_BACKOFFICE_SHOW_USER = 'backoffice-show-user';
export const PERMISSION_BACKOFFICE_DETAIL_USER = 'backoffice-detail-user';
export const PERMISSION_BACKOFFICE_UPDATE_USER = 'backoffice-update-user';
export const PERMISSION_BACKOFFICE_CREATE_USER = 'backoffice-create-user';
export const PERMISSION_BACKOFFICE_DELETE_USER = 'backoffice-delete-user';

export const PERMISSION_BACKOFFICE_SHOW_PRODUCT_CATEGORY =
    'backoffice-show-product-category';
export const PERMISSION_BACKOFFICE_DETAIL_PRODUCT_CATEGORY =
    'backoffice-detail-product-category';
export const PERMISSION_BACKOFFICE_UPDATE_PRODUCT_CATEGORY =
    'backoffice-update-product-category';
export const PERMISSION_BACKOFFICE_CREATE_PRODUCT_CATEGORY =
    'backoffice-create-product-category';
export const PERMISSION_BACKOFFICE_DELETE_PRODUCT_CATEGORY =
    'backoffice-delete-product-category';

export const PERMISSION_BACKOFFICE_SHOW_POIN_HISTORY =
    'backoffice-show-poin-history';
export const PERMISSION_BACKOFFICE_DETAIL_POIN_HISTORY =
    'backoffice-detail-poin-history';

export const PERMISSION_BACKOFFICE_SHOW_DEPOSIT_TRASH =
    'backoffice-show-deposit-trash';
export const PERMISSION_BACKOFFICE_DETAIL_DEPOSIT_TRASH =
    'backoffice-detail-deposit-trash';
export const PERMISSION_BACKOFFICE_UPDATE_DEPOSIT_TRASH =
    'backoffice-update-deposit-trash';

export const PERMISSION_BACKOFFICE_SHOW_DEPOSIT_TRASH_ITEM =
    'backoffice-show-deposit-trash-item';
export const PERMISSION_BACKOFFICE_VALIDATE_DEPOSIT_TRASH_ITEM =
    'backoffice-validate-deposit-trash-item';

export const PERMISSION_BACKOFFICE_SHOW_ROLE = 'backoffice-show-role';
export const PERMISSION_BACKOFFICE_DETAIL_ROLE = 'backoffice-detail-role';
export const PERMISSION_BACKOFFICE_UPDATE_ROLE = 'backoffice-update-role';
export const PERMISSION_BACKOFFICE_CREATE_ROLE = 'backoffice-create-role';
export const PERMISSION_BACKOFFICE_DELETE_ROLE = 'backoffice-delete-role';

export const PERMISSION_BACKOFFICE_SHOW_ROLE_PERMISSION =
    'backoffice-show-role-permission';
export const PERMISSION_BACKOFFICE_DETAIL_ROLE_PERMISSION =
    'backoffice-detail-role-permission';
export const PERMISSION_BACKOFFICE_UPDATE_ROLE_PERMISSION =
    'backoffice-update-role-permission';
export const PERMISSION_BACKOFFICE_CREATE_ROLE_PERMISSION =
    'backoffice-create-role-permission';
export const PERMISSION_BACKOFFICE_DELETE_ROLE_PERMISSION =
    'backoffice-delete-role-permission';

export const PERMISSION_BACKOFFICE_SHOW_PERMISSION =
    'backoffice-show-permission';
export const PERMISSION_BACKOFFICE_DETAIL_PERMISSION =
    'backoffice-detail-permission';
export const PERMISSION_BACKOFFICE_UPDATE_PERMISSION =
    'backoffice-update-permission';
