import { useState } from "react";
import logo from "../assets/img/logo.png";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../redux/slice/Auth";
import AuthService from "../service/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart());
    const user = { username: name, password, email };
    try {
      const response = await AuthService.userRegister(user);
      console.log(user);

      console.log(response);
      dispatch(registerUserSuccess());
    } catch (error) {
      dispatch(registerUserFailure());
    }
  };

  return (
    <div className="text-center mt-3">
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
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
