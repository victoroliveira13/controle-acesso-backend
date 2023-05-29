import { Router } from "express";
import { CreatePermissionController } from "./controllers/CreatePermissionController";
import { CreateProductController } from "./controllers/CreateProductController";
import { CreateRoleController } from "./controllers/CreateRoleController";
import { CreateRolePermissionController } from "./controllers/CreateRolePermissionController";
import { CreateUserAccessControlListController } from "./controllers/CreateUserAccessControlListController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { SessionController } from "./controllers/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetACLUserController } from "./controllers/GetACLUserController";
import { GetAllACLUserController } from "./controllers/GetAllACLUserController";
import { RemoveUserController } from "./controllers/RemoveUserController";
import { GetAllPermissionController } from "./controllers/GetAllPermissionController";
import { RemovePermissionController } from "./controllers/RemovePermissionController";
import { GetAllRolesController } from "./controllers/GetAllRolesController";
import { RemoveRoleController } from "./controllers/RemoveRoleController";
import { GetUserTokenController } from "./controllers/GetUserTokenController";
import { GetRolePermissionController } from "./controllers/GetRolePermissionController";
import { can, is } from "./middleware/permissions";

export const routes = Router();

/* -------------------------------
Sessao
*/
routes.post( //Criar sessao
  "/login",
  new SessionController().handle
);
routes.get( //Buscar sessao
  "/user/:token",
  ensuredAuthenticated(),
  new GetUserTokenController().handle
);

/* -------------------------------
User
*/
routes.post( //Criar user
  "/user",
  new CreateUserController().handle
);
routes.get( //Buscar todos os users
  "/users",
  ensuredAuthenticated(),
  new GetAllUsersController().handle
);
routes.delete( //Deletar user
  "/users/:userId",
  ensuredAuthenticated(),
  is(["admin"]), 
  new RemoveUserController().handle
);

/* -------------------------------
Products
*/
routes.post( //Criar product
  "/products",
  ensuredAuthenticated(),
  can(["create_product"]), 
  new CreateProductController().handle
);
routes.get( //Buscar todos os produtos
  "/products",
  ensuredAuthenticated(),
  can(["list_product"]),
  new GetAllProductsController().handle
);

/* -------------------------------
Role
*/
routes.post( //Criar role
  "/roles",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRoleController().handle
);
routes.get( //Buscar todas as roles
  "/roles",
  ensuredAuthenticated(),
  is(["admin"]),
  new GetAllRolesController().handle
);
routes.delete( //Deletar role
  "/roles/:roleId",
  ensuredAuthenticated(),
  is(["admin"]),
  new RemoveRoleController().handle
);

/* -------------------------------
Permission
*/
routes.post( //Criar permission
  "/permissions",
  ensuredAuthenticated(),
  can(["create_permission"]),
  new CreatePermissionController().handle
);
routes.get( //Buscar todas as permissions
  "/permissions",
  ensuredAuthenticated(),
  //can(["list_permission"]),
  new GetAllPermissionController().handle
);
routes.delete( //Deletar permission
  "/permissions/:permissionId",
  ensuredAuthenticated(),
  //can(["delete_permission"]),
  new RemovePermissionController().handle
);

/* -------------------------------
ACL User
*/
routes.post( //Vincular permission e role em user
  "/users/acl",
  ensuredAuthenticated(),
  new CreateUserAccessControlListController().handle
);
routes.get( //Buscar roles e permissions relacionadas aos users
  "/users/acl",
  ensuredAuthenticated(),
  is(['admin']),
  new GetAllACLUserController().handle
);
routes.get( //Buscar roles e permissions relacionadas ao user
  "/user/acl/:userId",
  ensuredAuthenticated(),
  new GetACLUserController().handle
)

/* -------------------------------
ACL Permission / Role
*/
routes.post( //Vincular Permission na Role
  "/roles/:roleId",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRolePermissionController().handle
);
routes.get( //Buscar Permission na Role
  "/roles/:roleId",
  ensuredAuthenticated(),
  new GetRolePermissionController().handle
);