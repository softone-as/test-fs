import { TagCreateRequest } from 'apps/backoffice/src/modules/cinema/requests/tag/tag-create.request';

export type IFormTag = Omit<TagCreateRequest, ''>;
