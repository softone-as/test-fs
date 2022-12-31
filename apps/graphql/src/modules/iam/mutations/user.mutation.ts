import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserCrudApplication } from "../applications/user-crud.application";
import { UpdateUserFullname, User } from "../types/user.type";

@Resolver(of => User)
export class UserMutation {
    constructor(
        private userApplication: UserCrudApplication,
    ) { }

    @Mutation(returns => User)
    async updateUser(
        @Args({ name: 'id', type: () => Int }) id: number,
        @Args('updateUserFullname') updateUserFullname: UpdateUserFullname,
    ) {
        return this.userApplication.update(id, updateUserFullname);
    }

}