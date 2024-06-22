import { StudioCreateRequest } from 'apps/backoffice/src/modules/cinema/requests/studio/studio-create.request';

export type IFormStudio = Omit<StudioCreateRequest, ''>;
