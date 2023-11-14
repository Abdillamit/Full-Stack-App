import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} from "../redux/slice/Auth";
import AuthService from "../service/Auth";
import { Input } from "../ui";
import { ValidationError } from "./Index";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { username: name, password, email };
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="text-center mt-3">
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <ValidationError />
          <Input setStage={setName} state={name} leble={"Username"} />
          <Input setStage={setEmail} state={email} leble={"Email address"} />
          <Input
            setStage={setPassword}
            state={password}
            type={"password"}
            leble={"Password"}
          />
          <button
            disabled={isLoading}
            onClick={registerHandler}
            className="btn btn-primary w-100 py-2"
            type="submit"
          >
            {isLoading === true ? "Registering..." : "Register"}
          </button>
        </form>
      </main>
    </div>
  );
}
