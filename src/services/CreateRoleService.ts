import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";

type RoleRequest = {
  name: string;
  description: string;
};

/* Criar Role
Pre-condicao: nao ha;
Pos-condicao: nova role;
Descricao: recebe os argumentos (name, description):RoleRequest, cria uma nova role e
a retorne.
*/

export class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const repo = RoleRepository();

    if (await repo.findOne({ name })) {
      return new Error("Role already exists");
    }

    const role = repo.create({ name, description });

    await repo.save(role);

    return role;
  }
}
