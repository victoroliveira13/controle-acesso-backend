import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import { UserRepository } from "../repositories";

type ACLUserResponse = {
  user: string;
  roles: RoleResponse[];
  permissions: PermissionResponse[];
}

type RoleResponse = {
  name: string;
  description: string;
}

type PermissionResponse = {
  name: string;
  description: string;
}

/* Busca roles e permissions relacionadas ao user
Pre-condicao: usuário autenticado (token gerado);
Pos-condicao: não há;
Descrição: Busca as roles e permissões do usuário
*/
export class GetACLUserService {
  async execute({ id }): Promise<ACLUserResponse | Error> {
    const userRepo = UserRepository();

    const user = await userRepo.findOne({ id }, { relations: ["roles", "permissions"] });

    if (!user) {
      return new Error("User does not exist!");
    }

    const roles: RoleResponse[] = user.roles.map((role: Role) => ({
      name: role.name,
      description: role.description,
    }));

    const permissions: PermissionResponse[] = user.permissions.map((permission: Permission) => ({
      name: permission.name,
      description: permission.description,
    }));

    return {
      user: user.username,
      roles: roles,
      permissions: permissions,
    };
  }
}
