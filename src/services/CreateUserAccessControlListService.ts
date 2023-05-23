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

/* Vincular permission e role em user
Pre-condicao: nao ha;
Pos-condicao: user com novas permissions e roles;
Descricao: Recebe o id do usuario logado (token bearer), e vincula ao mesmo, as
permissions e roles passadas.
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
