import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import Home from "./containers/Home/Home";
import HomeWorker from "./containers/HomeWorker";
import UserInfo from "./components/Profile/UserInfoIndex";
import NotFoundPage from "./containers/NotFoundPage";
import RequireAuth from "./components/RequireAuth";

import Login from "./containers/LogInAndSignUp/Login";
import SignUp from "./containers/LogInAndSignUp/SignUp";
import Activate from "./containers/LogInAndSignUp/Activate";
import ResetPassword from "./containers/LogInAndSignUp/ResetPassword";
import ResetPasswordConfirm from "./containers/LogInAndSignUp/ResetPasswordConfirm";

import ShopList from "./containers/Shop/ShopList";
import IndividualShop from "./containers/Shop/IndividualShop";
import MyShop from "./containers/MyShop/MyShop";

import IndividualItem from "./containers/Item/IndividualItem";
import ContactUs from "./containers/ContactUs";

import Cart from "./containers/Cart/Cart";

import SlideItemCard from "./components/SlideItemCard";

import Layout from "./hocs/Layout";

import { Provider } from "react-redux";
import store from "./store";

const App = ({ isAuthenticated }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            // login signup
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/shop/:placeName" element={<ShopList />} />
            <Route path="/shops/:shopName" element={<IndividualShop />} />
            <Route
              path="/shops/:shopName/:itemName"
              element={<IndividualItem />}
            />
            <Route path="/item/:itemName" element={<IndividualItem />} />
            <Route path="/myShop" element={<MyShop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/SlideItemCard" element={<SlideItemCard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
