import userService from "@/admin/services/user";

const getCSRF = callback => {
  userService.getCSRF().then(
    ({ data }) => {
      callback(null, data.csrfToken);
    },
    error => {
      callback(error, null);
    }
  );
};

const hasTokenExpired = token => {
  const outObj = { loggedIn: true, token };

  getCSRF((error, csrf) => {
    if (error) {
      console.error(error);
    } else {
      outObj.csrf = csrf;
    }
  });

  if (new Date(JSON.parse(window.atob(token.split(".")[1])).exp * 1000) < new Date()) {
    // Token outdated
    outObj.loggedIn = false;
    outObj.token = null;
    outObj.csrf = null;

    userService.logout();
  }

  return outObj;
};

export default {
  namespaced: true,
  state: localStorage.getItem("@imaz:usuario")
    ? hasTokenExpired(localStorage.getItem("@imaz:usuario"))
    : { loggedIn: false, token: null, csrf: null },
  getters: {
    user(state) {
      let outObj = false;
      if (state.loggedIn) {
        const user = JSON.parse(window.atob(state.token.split(".")[1]));
        outObj = {
          _id: user._id,
          email: user.email
        };
      }
      return outObj;
    }
  },
  actions: {
    login({ commit }, { email, password, callback }) {
      userService.login(email, password, (err, res) => {
        if (err) {
          callback(err, null);
        } else {
          getCSRF((error, csrf) => {
            if (error) {
              console.error(error);
            } else {
              commit("setCSRF", csrf);
            }
          });
          commit("loginSuccess", res.data.token);
          callback(null, res);
        }
      });
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    }
  },
  mutations: {
    setCSRF(state, csrf) {
      state.csrf = csrf;
    },
    loginSuccess(state, token) {
      state.loggedIn = true;
      state.token = token;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.token = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.csrf = null;
    }
  }
};
