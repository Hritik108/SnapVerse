import {RouteConfig} from "./RouteConfig";
// import { RoutePath } from "./RoutePath";
// import { lazy } from "react";

import { Route,Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

const AppRouter = () => {
  return (
    <Routes>
      {RouteConfig.map((route: any, index: number) => {
        const Component = route.component;

        return (
          <Route element={<DashboardLayout />} key={index}>
          <Route
            key={index}
            path={route.path}
            element={<Component />}
          />
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRouter;