import { Request, Response } from "express";
import { GetRolePermissionService } from "../services/GetRolePermissionService";

export class GetRolePermissionController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params;

    const getRolePermissionService = new GetRolePermissionService();

    const result = await getRolePermissionService.execute({ roleId });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
