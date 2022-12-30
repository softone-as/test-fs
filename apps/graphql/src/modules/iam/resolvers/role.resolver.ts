import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { RoleCrudApplication } from "../applications/role-crud.application";
import { Role } from "../types/role.type";

@Resolver(of => Role)
export class RoleResolver {
    constructor(
        private roleApplication: RoleCrudApplication,
    ) { }

    @Query(returns => Role)
    async role(@Args('id', { type: () => Int }) id: number) {
        return this.roleApplication.findById(id);
    }
}
