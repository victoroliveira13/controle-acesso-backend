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

routes.get(
  "/users",
  ensuredAuthenticated(),
  is(["admin"]), //middleware
  new GetAllUsersController().handle
);
routes.post(
  "/users",
  ensuredAuthenticated(),
  new CreateUserController().handle
);
routes.delete(
  "/users/:userId",
  ensuredAuthenticated(),
  is(["admin"]), //middleware
  new RemoveUserController().handle
);

routes.post("/login", new SessionController().handle);

routes.get("/products", new GetAllProductsController().handle);
routes.post(
  "/products",
  ensuredAuthenticated(),
  can(["create_product", "list_product"]), //middleware
  new CreateProductController().handle
);

routes.post(
  "/roles",
  ensuredAuthenticated(),
  //is(["admin"]), //middleware
  new CreateRoleController().handle
);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  new CreatePermissionController().handle
);

routes.post(
  "/users/acl",
  ensuredAuthenticated(),
  new CreateUserAccessControlListController().handle
);

routes.post("/roles/:roleId", new CreateRolePermissionController().handle);

export { routes };
