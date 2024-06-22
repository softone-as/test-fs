import { MovieScheduleCreateRequest } from 'apps/backoffice/src/modules/cinema/requests/movie-schedule/movie-schedule-create.request';

export type IFormMovieSchedule = Omit<MovieScheduleCreateRequest, ''>;
