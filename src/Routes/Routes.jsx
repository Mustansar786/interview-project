import React from "react";
import { Switch, Redirect } from "react-router-dom";
import {
  RouteWithLayout
} from "../components";
import { MainWithSidebar } from "../layouts";

import { Employees_Listing,Employee_Profile,Employee_Blogs_Post } from "../pages";
function Routes() {
  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/employees_listing" />
        <RouteWithLayout
          component={Employees_Listing}
          exact
          layout={MainWithSidebar}
          path="/employees_listing"
        />
        <RouteWithLayout
          component={Employee_Profile}
          exact
          layout={MainWithSidebar}
          path="/employees_listing/employee_profile/:id"
        />
        <RouteWithLayout
          component={Employee_Blogs_Post}
          exact
          layout={MainWithSidebar}
          path="/employees_listing/employee_blogs_post/:id"
        />
        
      </Switch>
    </>
  );
}

export default Routes;
