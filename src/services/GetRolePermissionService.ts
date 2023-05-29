import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import { PermissionRepository, RoleRepository } from "../repositories";

type PermissionResponse = {
  name: string;
  description: string;
}

type RolePermissionReturned = {
  name: string;
  description: string;
  permissions: PermissionResponse[];
}

/* Buscar Permission na Role
Pre-condicao: Role e permission devem existir;
Pos-condicao: nao ha;
Descricao: retorna permissions vinculadas na role.
*/
export class GetRolePermissionService {
  async execute({ roleId }): Promise<RolePermissionReturned | Error> {
    const repo = RoleRepository();

    const role = await repo.findOne(roleId, { relations: ["permissions"] });

    if (!role) {
      return new Error("Role has no permissions!");
    }

    const permissions: PermissionResponse[] = role.permissions.map((permission: Permission) => ({
      name: permission.name,
      description: permission.description,
    }));

    return {
      name: role.name,
      description: role.description,
      permissions: permissions,
    };
  }
}
