import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "entities/iam/permission.entity";
import { RolePermission } from "entities/iam/role-permission.entity";
import { Role } from "entities/iam/role.entity";
import { User } from "entities/iam/user.entity";
import { RoleCrudApplication } from "./applications/role-crud.application";
import { UserCrudApplication } from "./applications/user-crud.application";
import { RoleResolver } from "./resolvers/role.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, RolePermission, Permission]),
    ],
    providers: [
        UserCrudApplication,
        UserService,
        UserResolver,
        RoleCrudApplication,
        RoleService,
        RoleResolver
    ]
})
export class IAMModule { }
