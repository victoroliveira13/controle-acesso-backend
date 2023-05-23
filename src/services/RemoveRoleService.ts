import { Role } from "../entities/Role";
import {  RoleRepository } from "../repositories";


export class RemoveRoleService {
  async execute({ roleId }): Promise<Role | Error> {
    const repo = RoleRepository();

    const role = await repo.findOne(roleId);

    if (!role) {
      return new Error("Role does not exists!");
    }

    await RoleRepository().remove(role);

    return role;
  }
}
