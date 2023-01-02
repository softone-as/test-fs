import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "apps/graphql/src/common/guards/auth-guard.decorator";
import { PermissionGuard } from "apps/graphql/src/common/guards/permission-guard.decorator";
import { config } from "apps/graphql/src/config";
import { CacheGetSet } from "apps/graphql/src/infrastructure/cache/decorators/cache-get-set.decorator";
import { PERMISSION_GRAPHQL_DETAIL_USER, PERMISSION_GRAPHQL_SHOW_USER } from "interface-models/iam/permission.interface";
import { UserCrudApplication } from "../applications/user-crud.application";
import { UserIndexApplication } from "../applications/user-index.application";
import { PaginateUser, User, UserIndexRequest } from "../types/user.type";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userApplication: UserCrudApplication,
        private userIndexApplication: UserIndexApplication,
    ) { }

    @Query(returns => User)
    @AuthGuard()
    @PermissionGuard(PERMISSION_GRAPHQL_DETAIL_USER)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.userApplication.findById(id);
    }

    @Query(type => [User])
    @AuthGuard()
    @PermissionGuard(PERMISSION_GRAPHQL_SHOW_USER)
    async users(@Args('limit', { type: () => Int }) limit: number = 10) {
        return this.userApplication.getAll(limit);
    }

    @Query(type => PaginateUser)
    @CacheGetSet(config.cache.name.users.list)
    @AuthGuard()
    @PermissionGuard(PERMISSION_GRAPHQL_SHOW_USER)
    async userPaginate(
        @Args('paginate') paginate: UserIndexRequest,
    ) {
        return this.userIndexApplication.fetch(paginate);
    }
}
