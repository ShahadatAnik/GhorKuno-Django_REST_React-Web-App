import React, { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../redux/actions/auth";
import NavBar from "../components/NavBar";
import WorkerNavBar from "../components/WorkerNavBar";
import axios from "axios";

const Layout = ({ checkAuthenticated, load_user, children }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, [checkAuthenticated]);

  return (
    <div>
      <NavBar />

      {children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
