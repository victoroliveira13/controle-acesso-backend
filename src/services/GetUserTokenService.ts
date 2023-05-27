import { UserRepository } from "../repositories";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import * as jwt from 'jsonwebtoken';

type UserReturned = {
  id: String;
  username: string;
  roles: ACLUserResponse[];
  permissions: ACLUserResponse[];
}

type ACLUserResponse = {
  name: string;
  description: string;
}

/* Busca usuário relacionado ao token
Pre-condicao: nao ha;
Pos-condicao: usuario autenticado (token gerado);
Descricao: Busca o id do usuário que criou o token
*/
export class GetUserTokenService {
  async execute({ token }): Promise<UserReturned> {
    const payload = jwt.decode(token);
    const repo = UserRepository();
    const user = await repo.findOne({ id: payload.sub.toString() });

    const { id, username } = user;

    const acl = await repo.findOne(user.id, { relations: ["roles", "permissions"] });

    const roles: ACLUserResponse[] = acl.roles.map((role: Role) => ({
      name: role.name,
      description: role.description,
    }));

    const permissions: ACLUserResponse[] = acl.permissions.map((permission: Permission) => ({
      name: permission.name,
      description: permission.description,
    }));

    return { id, username, roles, permissions };
  }
}
