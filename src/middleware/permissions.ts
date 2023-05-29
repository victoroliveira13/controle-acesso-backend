import { NextFunction, Request, Response } from "express";
import { RoleRepository, UserRepository } from "../repositories";
import { Permission } from "../entities/Permission";

/* Verifica permissions do user
Pre-condicao: User existente;
Descricao: verifica se id do usuario existe, pega as permissions relacionadas a ele,
e verifica se eh igual a permission da requisicao.
*/
export function can(permissionsRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ["roles", "permissions"],
    });

    if (!user) {
      return response.status(400).json("User does not exist");
    }

    const permissions: string[] = [...user.permissions.map((permission) => permission.name)];

    for (const userRole of user.roles) {
      const roleRepo = RoleRepository();
      const roleEntity = await roleRepo.findOne({ name: userRole.name }, { relations: ["permissions"] });

      const rolePermissions: string[] = roleEntity.permissions.map((permission: Permission) => permission.name);

      permissions.push(...rolePermissions);
    }

    const permissionExists = permissions.some((permission) => permissionsRoutes.includes(permission));

    if (!permissionExists) {
      return response.status(401).end();
    }

    return next();
  };
}

/* Verifica role do user
Pre-condicao: User existente;
Descricao: verifica se id do usuario existe, pega a role relacionada a ele,
e verifica se eh igual a role da requisicao.
*/
export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) {
      return response.status(400).json("User does not exists");
    }

    const roleExists = user.roles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role));

    if (!roleExists) {
      return response.status(401).end();
    }

    return next();
  };
}
