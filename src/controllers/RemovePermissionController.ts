import { Request, Response } from "express";
import { RemovePermissionService } from "../services/RemovePermissionService";

export class RemovePermissionController {
  async handle(request: Request, response: Response) {
    const { permissionId } = request.params; 

    const removePermissionService = new RemovePermissionService();
    const result = await removePermissionService.execute({ permissionId });
    
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
