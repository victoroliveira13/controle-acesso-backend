import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";

export class GetAllRolesService {
  async execute(): Promise<Role[]> {
    const role = await RoleRepository().find();
    return role;
  }
}
