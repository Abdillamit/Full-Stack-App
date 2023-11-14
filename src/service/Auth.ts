import axios from "./Api";

const AuthService = {
  async userRegister(user) {
    return (await axios.post("/users", { user })).data;
  },
  async userLogin(user) {
    return (await axios.post("/users/login", { user })).data;
  },
  async getUser() {
    return (await axios.get("/user")).data;
  },
};

export default AuthService;
