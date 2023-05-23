import { Request, Response } from "express";
import { GetAllPermissionsService } from "../services/GetAllPermissionsService";

export class GetAllPermissionController {
  async handle(request: Request, response: Response) {
    const getAllPermissionsService = new GetAllPermissionsService();

    const permissions = await getAllPermissionsService.execute();

    return response.json(permissions);
  }
}
