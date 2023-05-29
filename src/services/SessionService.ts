import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { RoleRepository, UserRepository } from "../repositories";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";

type UserRequest = {
  username: string;
  password: string;
};

type ACLUserResponse = {
  name: string;
  description: string;
  origin: string,
}


export class SessionService {
  async execute({ username, password }: UserRequest) {
    const repo = UserRepository();

    const user = await repo.findOne({ username });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    const acl = await repo.findOne(user.id, { relations: ["roles", "permissions"] });

    const roles: ACLUserResponse[] = acl.roles.map((role: Role) => ({
      name: role.name,
      description: role.description,
      origin: "User",
    }));

    const permissions: ACLUserResponse[] = acl.permissions.map((permission: Permission) => ({
      name: permission.name,
      description: permission.description,
      origin: "User",
    }));

    // Obter as permissions da role do user
    for (const userRole of acl.roles) {
      const roleRepo = RoleRepository();
      const roleEntity = await roleRepo.findOne({ name: userRole.name}, { relations: ["permissions"] });

      const rolePermissions: ACLUserResponse[] = roleEntity.permissions.map((permission: Permission) => ({
        name: permission.name,
        description: permission.description,
        origin: "Role",
      }));

      permissions.push(...rolePermissions);
    }

    return { token, user: { 
      id: user.id,
      username: user.username,
      roles: roles,
      permissions: permissions,
    } };
  }
}
