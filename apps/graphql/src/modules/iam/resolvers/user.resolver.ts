import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserCrudApplication } from "../applications/user-crud.application";
import { User } from "../types/user.type";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userApplication: UserCrudApplication,
    ) { }

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.userApplication.findById(id);
    }

    @Query(type => [User])
    async users() {
        return this.userApplication.getAll();
    }
}
