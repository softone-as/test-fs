import { Product } from 'entities/product/product.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ProductCategory } from 'entities/product/product-category.entity';

export class CreateProdcutSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const { data } = require('../dummies/product.json');

        const datax = await connection.getRepository(Product).find();
        if (datax.length <= 0) {
            const productCategory = await connection
                .createQueryBuilder(ProductCategory, 'product_categories')
                .where({
                    name: 'plastik',
                })
                .getOne();

            for (let i = 0; i < data.length; i++) {
                const newProduct = connection.getRepository(Product).create();

                newProduct.name = data[i].name;
                newProduct.price = +data[i].price;
                newProduct.pickupBonus = +data[i].pickupBonus;
                newProduct.iconUrl = data[i].iconUrl;
                newProduct.productCategory = productCategory;

                await connection.getRepository(Product).save(newProduct);
            }
        }
    }
}
