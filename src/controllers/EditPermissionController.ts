import { Request, Response } from "express";
import { EditPermissionService } from "../services/EditPermissionService";

export class EditPermissionController {
  async handle(request: Request, response: Response) {
    const { permissionId } = request.params; 
    const { name, description } = request.body;

    const editPermissionService = new EditPermissionService();

    const result = await editPermissionService.execute( permissionId, { name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
