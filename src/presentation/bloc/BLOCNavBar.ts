import { ploc } from "@/presentation/bloc/_PLOC";
import { SNavBar } from "@/presentation/store/SNavBar";
import { RouteLocation, Router } from "vue-router";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";

export default class BLOCNavBar extends ploc<SNavBar> {
  constructor({
    store,
    router,
    route,
  }: {
    store: SNavBar;
    router: Router;
    route: RouteLocation;
  }) {
    super({ store, router, route });
  }

  public initComponent(): void {}

  public toggleNavBar(): void {
    this.store.navbarOpened = !this.store.navbarOpened;
  }

  public hasRole(role: UserRolesENUM): boolean {
    return this.store.userRoles.includes(role);
  }
}
