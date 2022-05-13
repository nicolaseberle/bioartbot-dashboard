import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    async reset_password({ commit }, email, oldPassword, newPassword, token) {
      return await AuthService.reset_password(
        email,
        oldPassword,
        newPassword,
        token
      )
        .then(
          (response) => {
            commit("resetPasswordSuccess");
            return Promise.resolve(response);
          },
          (error) => {
            console.log("resetPasswordFailure with ::", error);
            commit("resetPasswordFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          console.log("catch ::", error);
        });
    },
    forgot_password({ commit }, email) {
      return AuthService.forgot_password(email).then(
        (response) => {
          commit("invitationToResetPasswordSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("invitationToResetPasswordFailure");
          return Promise.reject(error);
        }
      );
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, accessToken) {
      commit("refreshToken", accessToken);
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    resetPasswordSuccess(state) {
      state.status.loggedIn = false;
    },
    resetPasswordFailure(state) {
      state.status.loggedIn = false;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    invitationToResetPasswordSuccess(state) {
      state.status.loggedIn = false;
    },
    invitationToResetPasswordFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
  },
};
