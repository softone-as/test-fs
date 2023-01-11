import { User } from 'entities/iam/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from 'entities/iam/role.entity';
import * as bcrypt from 'bcrypt';

export class CreateUserAdminSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const results = [];

        const { data } = require('../dummies/admin.json');

        const datax = await connection.getRepository(User).find();
        if (datax.length <= 0) {
            const role = await connection
                .createQueryBuilder(Role, 'roles')
                .where({
                    key: 'admin',
                })
                .getOne();

            for (let i = 0; i < data.length; i++) {
                results.push(
                    Object.assign(new User(), {
                        fullname: data[i].fullname,
                        email: data[i].email,
                        password: data[i].password,
                        identityNumber: data[i].identityNumber,
                        phoneNumber: data[i].phoneNumber,
                        role: role,
                    }),
                );

                await connection
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values(results)
                    .execute();
            }
        }
    }
}
