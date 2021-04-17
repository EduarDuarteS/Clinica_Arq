import React from "react";
import AuthForm from "../components/authForm";

const Login = () => {
  const login = async () => {
    window.location = "/alta1";
  };
  return <AuthForm title="Login" action={login} />;
};

export default Login;
