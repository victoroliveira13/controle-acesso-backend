import { Request, Response } from "express";
import { EditRoleService } from "../services/EditRoleService";

export class EditRoleController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params; 
    const { name, description } = request.body;

    const editRoleService = new EditRoleService();

    const result = await editRoleService.execute( roleId, { name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
