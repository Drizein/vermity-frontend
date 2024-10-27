/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHashHistory} from "vue-router";
import { RouteRecordRaw } from "vue-router";
import LandlordPage from "@/presentation/pages/LandlordPage.vue";
import Login from "@/presentation/pages/Login.vue";
import Register from "@/presentation/pages/Register.vue";
import Profile from "@/presentation/pages/Profile.vue";
import { dependencyProvider } from "@/core/main";
import TenantPage from "@/presentation/pages/TenantPage.vue";
import { UserRolesENUM } from "@/domain/enums/UserRolesENUM";
import Home from "@/presentation/pages/Home.vue";
import Invoices from "@/presentation/pages/Invoices.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/landlord",
    component: LandlordPage,
    meta: {
      requiresAuth: true,
      requiredRoles: [UserRolesENUM.LANDLORD],
    },
  },
  {
    path: "/tenant",
    component: TenantPage,
    meta: {
      requiresAuth: true,
      requiredRoles: [UserRolesENUM.TENANT],
    },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/invoices",
    component: Invoices,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    // check if user is logged in
    const isLoggedIn = dependencyProvider.provideUCCheckLoginStatus().execute();
    //console.log(isLoggedIn);
    if (!isLoggedIn) {
      return "/login";
    }
  }
  if (to.meta.requiredRoles && to.meta.requiresAuth) {
    const currentUser = await dependencyProvider.provideUcGetUser().execute();
    // check if user has the required role
    const hasRequiredRole = currentUser.roleList.some((role) =>
      (to.meta.requiredRoles as UserRolesENUM[]).includes(role),
    );
    if (!hasRequiredRole) {
      return "/profile";
    }
  }
});

export default router;
