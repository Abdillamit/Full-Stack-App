import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/img/logo.png";
import {
  signUserStart,
  signUserSuccess,
  signUserFailure,
} from "../redux/slice/Auth";
import AuthService from "../service/Auth";
import { Input } from "../ui";
import { ValidationError } from "./Index";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useSelector((state) => state.auth);

  function loginHandler(e) {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = AuthService.userLogin(user);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  }

  return (
    <div className="text-center mt-3">
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>
          <ValidationError />
          <Input setStage={setEmail} state={email} leble={"Email address"} />
          <Input
            setStage={setPassword}
            state={password}
            type={"password"}
            leble={"Password"}
          />
          <button
            disabled={isLoading}
            onClick={loginHandler}
            className="btn btn-primary w-100 py-2"
            type="submit"
          >
            {isLoading === true ? "loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
}
