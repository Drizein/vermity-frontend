import { RouteLocation, Router } from "vue-router";
import { IPLOCDefaultParams } from "@/domain/interfaces/IPLOCDefaultParams";

export abstract class ploc<T> {
  public store: T;
  public router: Router;
  public route: RouteLocation;

  constructor({ store, router, route }: IPLOCDefaultParams<T>) {
    this.route = route;
    this.router = router;
    this.store = store;
  }

  abstract initComponent(): any;
}
