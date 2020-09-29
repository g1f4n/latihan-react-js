/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import Parse from "parse";
import * as env from "./env";
import { checkUser, getUserRole } from "./utils";

Parse.initialize(env.APPLICATION_ID, env.JAVASCRIPT_KEY, env.MASTER_KEY);
Parse.serverURL = env.SERVER_URL;
Parse.masterKey = env.MASTER_KEY;
console.log("parse", env.APPLICATION_ID);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route
        path="/"
        render={(props) =>
          checkUser() ? <AdminLayout {...props} /> : <Redirect to="/auth" />
        }
      />
      {/* {localStorage.getItem('roles') === null ? (
        <Redirect from="/" to={`/auth`} />
      ) : (
        <Redirect from="/" to={`/${localStorage.getItem('roles')}/index`} />
      )} */}
      {/* <Redirect from="/" to="/auth" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
