import { TCTagDetailProps } from 'apps/backoffice/@contracts/cinema/tag/tag-detail.contract';
import { ITag } from 'interface-models/movie/tag.interface';

export class TagResponse {
    public static readonly fromEntity = (
        tag: ITag,
    ): TCTagDetailProps['data'] => ({
        id: tag.id,
        name: tag.name,
        movies: tag.movies,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
    });

    static fromEntities(data: ITag[]): TCTagDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
