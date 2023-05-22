import { Role } from "../entities/Role";
import { PermissionRepository, RoleRepository } from "../repositories";

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

/* Vincula Permission na Role
Pre-condicao: Role e permission devem existir;
Pos-condicao: Role com permission;
Descricao: recebe os ids (roleId, permissions):RolePermissionRequest, e
vincula na role a permission passada.
*/
export class CreateRolePermissionService {
  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const repo = RoleRepository();

    const role = await repo.findOne(roleId);

    if (!role) {
      return new Error("Role does not exists!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await repo.save(role);

    return role;
  }
}
