import { ConfigResponse } from '../../../../src/modules/config/responses/config.response';

export type FormConfigType = Omit<ConfigResponse, 'id'>;
