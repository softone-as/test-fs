import { TCStudioDetailProps } from 'apps/backoffice/@contracts/movie/studio/studio-detail.contract';
import { IStudio } from 'interface-models/movie/studio.interface';

export class StudioResponse {
    public static readonly fromEntity = (
        studio: IStudio,
    ): TCStudioDetailProps['data'] => ({
        id: studio.id,
        studioNumber: studio.studioNumber,
        seatCapacity: studio.seatCapacity,
        createdAt: studio.createdAt,
        updatedAt: studio.updatedAt,
        movieSchedules: studio?.movieSchedules ?? [],
    });

    static fromEntities(data: IStudio[]): TCStudioDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
