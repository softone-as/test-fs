import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IUser } from 'interface-models/iam/user.interface';

export type TCUserIndexProps = IPaginateResponse<Omit<IUser, 'password'>>;
