import { ProductCategory } from 'entities/product/product-category.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateProdcutCategorySeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const results = [];

        const { data } = require('../dummies/product-category.json');

        const datax = await connection.getRepository(ProductCategory).find();
        if (datax.length <= 0) {
            for (let i = 0; i < data.length; i++) {
                results.push(
                    Object.assign(new ProductCategory(), {
                        name: data[i].name,
                        iconUrl: data[i].iconUrl,
                    }),
                );

                await connection
                    .createQueryBuilder()
                    .insert()
                    .into(ProductCategory)
                    .values(results)
                    .execute();
            }
        }
    }
}
