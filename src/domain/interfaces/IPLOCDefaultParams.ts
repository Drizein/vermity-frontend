import { RouteLocation, Router } from "vue-router";

export interface IPLOCDefaultParams<T> {
  store: T;
  router: Router;
  route: RouteLocation;
}
