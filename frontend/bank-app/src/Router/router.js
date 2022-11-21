import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountPage from "../Pages/AccountPage/accountPage";
import LoginPage from "../Pages/LoginPage/loginPage";
import SignUpPage from "../Pages/SignUpPage/signUpPage";
import ErrorPage from "../Pages/ErrorPage/error";
import InitialPage from "../Pages/InitialPage/initialPage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={"/"} element={<InitialPage />} />
        <Route path={"/user/login"} element={<LoginPage />} />
        <Route path={"/user/signup"} element={<SignUpPage />} />
        <Route path={"/user/account"} element={<AccountPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
