import { Permission } from "../entities/Permission";
import {  PermissionRepository } from "../repositories";


export class RemovePermissionService {
  async execute({ permissionId }): Promise<Permission | Error> {
    const repo = PermissionRepository();

    const permission = await repo.findOne(permissionId);

    if (!permission) {
      return new Error("Permission does not exists!");
    }

    await PermissionRepository().remove(permission);

    return permission;
  }
}
