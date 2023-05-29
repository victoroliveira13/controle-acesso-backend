import { Permission } from "../entities/Permission";
import { User } from "../entities/User";
import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from "../repositories";

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

type ACLResponse = {
  name: string;
  description: string;
}

type ACLUserResponse = {
  user: string;
  roles: ACLResponse[];
  permissions: ACLResponse[];
}

/* Vincular permission e role em user
Pre-condicao: nao ha;
Pos-condicao: user com novas permissions e roles;
Descricao: Recebe o id do usuario logado (token bearer), e vincula ao mesmo, as
permissions e roles passadas.
*/
export class CreateUserAccessControlListService {
  async execute({ userId, roles, permissions}: UserACLRequest): Promise<ACLUserResponse | Error> {
    const repo = UserRepository();

    const user = await repo.findOne(userId, { relations: ["roles", "permissions"] });

    if (!user) {
      return new Error("User does not exist!");
    }

    //Guarda apenas permissions e roles validas (nome correto)
    const permissionsExists = await PermissionRepository().findByIds(permissions);
    const rolesExists = await RoleRepository().findByIds(roles);

    // Observa as permissions na role do user, para impedir cadastro de uma permission que a role
    // do user ja possua
    const permissionsRole: ACLResponse[] = [];
    for (const userRole of user.roles) {
      const roleRepo = RoleRepository();
      const roleEntity = await roleRepo.findOne({ name: userRole.name}, { relations: ["permissions"] });
    
      const rolePermissions: ACLResponse[] = roleEntity.permissions.map((permission: Permission) => ({
        name: permission.name,
        description: permission.description,
      }));
    
      permissionsRole.push(...rolePermissions);
    }
    
    //Mantem ACL ja existentes, e adciona as permissions que o user e sua respectiva role contem
    const permissionsToAdd: Permission[] = [];
    const rolesToAdd = [];
    const skippedPermissions: Permission[] = []; // armazenar as permissions que foram ignoradas
    for (const newPermission of permissionsExists) {
      // Verifica se a permission nao esta presente nem em `user.permissions` nem em `permissionsRole`
      if (!user.permissions.find((permission) => permission.name === newPermission.name) &&
          !permissionsRole.find((permission) => permission.name === newPermission.name)) {
        permissionsToAdd.push(newPermission);
      } else {
        skippedPermissions.push(newPermission);
      }
    }
    for (const newRole of rolesExists) {
      if (!user.roles.find((role) => role.name === newRole.name)) {
        rolesToAdd.push(newRole);
      }
    }
    user.permissions.push(...permissionsToAdd);
    user.roles.push(...rolesToAdd);  

    if (permissionsToAdd.length === 0 && skippedPermissions.length > 0) {
      const errorMessage = `Error: No new permissions added because the following permissions already exist in user's roles: ${skippedPermissions.map(permission => permission.name).join(", ")}`;
      return new Error(errorMessage);
    }

    await repo.save(user);
    const aclUserResponse: ACLUserResponse = {
      user: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };

    return aclUserResponse;
  }
}
