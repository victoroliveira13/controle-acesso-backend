import { Permission } from "../entities/Permission";
import { PermissionRepository } from "../repositories";

export class GetAllPermissionsService {
  async execute(): Promise<Permission[]> {
    const permission = await PermissionRepository().find();
    return permission;
  }
}
