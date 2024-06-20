import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Tag } from 'entities/movie/tag.entity';

export class CreateTagSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const results: Tag[] = [];
        const { data: tags } = require('../dummies/tag.json');

        const existingTags = await connection.getRepository(Tag).find();

        for (const currentTag of tags) {
            const tagExist = existingTags.find(
                (tag) => tag.name === currentTag,
            );

            if (tagExist) {
                continue;
            }

            const tag = new Tag();
            tag.name = currentTag;
            results.push(tag);
        }

        await connection
            .createQueryBuilder()
            .insert()
            .into(Tag)
            .values(results)
            .execute();
    }
}
