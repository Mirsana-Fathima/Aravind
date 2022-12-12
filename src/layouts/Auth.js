import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import background from "assets/img/register_bg_2.png";
//import logo from "assets/img/Flexkart.png";
import "assets/styles/index.css";
export default function Auth() {

  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                `url(${background})`,
            }}>
          </div>
         
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
       
        </section>
      </main>
    </>
  );
}
