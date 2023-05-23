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
import { can, is } from "./middleware/permissions";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { RemoveUserController } from "./controllers/RemoveUserController";

const routes = Router();
routes.post("/login", new SessionController().handle);

routes.get(
  "/users",
  ensuredAuthenticated(),
  new GetAllUsersController().handle
);
routes.post(
  "/users",
  is(["admin"]),
  ensuredAuthenticated(),
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
routes.post(
  "/roles/:roleId",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRolePermissionController().handle
);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  can(["create_permission"]),
  new CreatePermissionController().handle
);

routes.post(
  "/users/acl",
  ensuredAuthenticated(),
  new CreateUserAccessControlListController().handle
);

export { routes };
