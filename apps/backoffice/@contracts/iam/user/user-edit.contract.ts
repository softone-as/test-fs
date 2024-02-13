import { TUserResponse } from 'apps/backoffice/@contracts/iam/user/user.response.contract';
import { TCUserCreateProps } from './user-create.contract';

export type TCUserEditProps = TCUserCreateProps & {
    id: number;
    data: TUserResponse;
    isUpdate: boolean;
};
