import axios from "axios";

export default {
  getCSRF() {
    return axios({
      method: "GET",
      url: "/api/usuarios/gtcf"
    });
  },
  login(email, password, callback) {
    axios({
      method: "POST",
      url: "/api/usuarios/login",
      data: { email, password }
    }).then(
      res => {
        if (res.status === 200) {
          localStorage.setItem("@imaz:usuario", res.data.token);
        }
        callback(null, res);
      },
      error => {
        callback(error, null);
      }
    );
  },
  resetTK(tk) {
    localStorage.setItem("@imaz:usuario", tk);
  },
  logout() {
    localStorage.removeItem("@imaz:usuario");
  }
};
