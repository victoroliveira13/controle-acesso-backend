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
import { can, is } from "./middleware/permissions";


const routes = Router();
routes.post("/login", new SessionController().handle);
routes.get(
  "/user/:token",
  ensuredAuthenticated(),
  new GetUserTokenController().handle
);

routes.get(
  "/users",
  ensuredAuthenticated(),
  new GetAllUsersController().handle
);
routes.post(
  "/user",
  ensuredAuthenticated(),
  is(["admin"]), 
  new CreateUserController().handle
);
routes.delete(
  "/users/:userId",
  ensuredAuthenticated(),
  is(["admin"]), 
  new RemoveUserController().handle
);

routes.get(
  "/products",
  ensuredAuthenticated(),
  can(["list_product"]),
  new GetAllProductsController().handle
);
routes.post(
  "/products",
  ensuredAuthenticated(),
  can(["create_product"]), 
  new CreateProductController().handle
);

routes.post(
  "/roles",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRoleController().handle
);
routes.get(
  "/roles",
  ensuredAuthenticated(),
  is(["admin"]),
  new GetAllRolesController().handle
);
routes.delete(
  "/roles/:roleId",
  ensuredAuthenticated(),
  is(["admin"]),
  new RemoveRoleController().handle
);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  can(["create_permission"]),
  new CreatePermissionController().handle
);
routes.get(
  "/permissions",
  ensuredAuthenticated(),
  //can(["list_permission"]),
  new GetAllPermissionController().handle
);
routes.delete(
  "/permissions/:permissionId",
  ensuredAuthenticated(),
  //can(["delete_permission"]),
  new RemovePermissionController().handle
);

routes.post(
  "/users/acl",
  ensuredAuthenticated(),
  new CreateUserAccessControlListController().handle
);
routes.get(
  "/users/acl",
  ensuredAuthenticated(),
  is(['admin']),
  new GetAllACLUserController().handle
);
routes.get(
  "/user/acl/:userId",
  ensuredAuthenticated(),
  new GetACLUserController().handle
)

routes.post(
  "/roles/:roleId",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRolePermissionController().handle
);

export { routes };