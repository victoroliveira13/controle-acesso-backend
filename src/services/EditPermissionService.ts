import { Permission } from "../entities/Permission";
import { PermissionRepository } from "../repositories";

type PermissionRequest = {
  name: string;
  description: string;
};

/* Editar Permission
Pre-condicao: id valido;
Pos-condicao: permission editada;
Descricao: recebe os argumentos (id:string, name:string, description:string):PermissionRequest,
procura a permission com o ID fornecido, atualiza os campos name e description e retorna
a permission atualizada.
*/
export class EditPermissionService {
  async execute(
    permissionId: string,
    { name, description }: PermissionRequest
  ): Promise<Permission | Error> {
    const repo = PermissionRepository();

    const permission = await repo.findOne(permissionId);
    if (!permission) {
      return new Error("Permission not found");
    }

    permission.name = name;
    permission.description = description;

    await repo.save(permission);

    return permission;
  }
}
