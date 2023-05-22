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

/* Criar Role
Pre-condicao: userId, roles e permissions devem existir;
Pos-condicao: insere permissions e roles a um user;
Descricao: recebe os ids (userId, roles, permissions):UserACLRequest, verifica a
existencia dos ids recebidos e os vincula a user.
*/
export class CreateUserAccessControlListService {
  async execute({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {
    const repo = UserRepository();

    const user = await repo.findOne(userId);

    if (!user) {
      return new Error("User does not exists!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    const rolesExists = await RoleRepository().findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    repo.save(user);

    return user;
  }
}
