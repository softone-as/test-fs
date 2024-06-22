import { MovieCreateRequest } from 'apps/backoffice/src/modules/cinema/requests/movie/movie-create.request';
import { MovieBulkUpdatePlayUntilRequest } from 'apps/backoffice/src/modules/cinema/requests/movie/movie-edit.request';

export type IFormMovie = Omit<MovieCreateRequest, ''>;
export type IMovieBulkUpdatePlayUntil = Omit<
    MovieBulkUpdatePlayUntilRequest,
    ''
>;
