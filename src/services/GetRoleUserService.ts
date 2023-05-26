import { Role } from "../entities/Role";
import { UserRepository } from "../repositories";

type RoleUserResponse = {
  user: string;
  roles: RoleResponse[];
}

type RoleResponse = {
  name: string;
  description: string;
}

/* Busca roles relacionadas ao usuário
Pre-condicao: usuário autenticado (token gerado);
Pos-condicao: não há;
Descrição: Busca as roles do usuário
*/
export class GetRoleUserService {
  async execute({ id }): Promise<RoleUserResponse | Error> {
    const userRepo = UserRepository();

    const user = await userRepo.findOne({ id }, { relations: ["roles"] });

    if (!user) {
      return new Error("User does not exist!");
    }

    const roles: RoleResponse[] = user.roles.map((role: Role) => ({
      name: role.name,
      description: role.description,
    }));

    return {
      user: user.username,
      roles: roles,
    };
  }
}
