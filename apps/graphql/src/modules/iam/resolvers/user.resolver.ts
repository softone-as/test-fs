import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { config } from "apps/graphql/src/config";
import { CacheGetSet } from "apps/graphql/src/infrastructure/cache/decorators/cache-get-set.decorator";
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
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.userApplication.findById(id);
    }

    @Query(type => [User])
    async users(@Args('limit', { type: () => Int }) limit: number = 10) {
        return this.userApplication.getAll(limit);
    }

    @Query(type => PaginateUser)
    @CacheGetSet(config.cache.name.users.list)
    async userPaginate(
        @Args('paginate') paginate: UserIndexRequest,
    ) {
        return this.userIndexApplication.fetch(paginate);
    }
}
