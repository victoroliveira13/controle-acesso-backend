import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";

type RoleRequest = {
  name: string;
  description: string;
};

/* Editar Role
Pre-condicao: id valido;
Pos-condicao: role editada;
Descricao: recebe os argumentos (id:string, name:string, description:string):roleRequest,
procura a role com o ID fornecido, atualiza os campos name e description e retorna
a role atualizada.
*/
export class EditRoleService {
  async execute(
    roleId: string,
    { name, description }: RoleRequest
  ): Promise<Role | Error> {
    const repo = RoleRepository();

    const role = await repo.findOne(roleId);
    if (!role) {
      return new Error("Role not found");
    }

    role.name = name;
    role.description = description;

    await repo.save(role);

    return role;
  }
}
