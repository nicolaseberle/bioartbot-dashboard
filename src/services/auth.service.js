import api from "./api";

class AuthService {
  login({ username, password }) {
    return api
      .post("/user/login", {
        username,
        password,
      })
      .then((response) => {
        //console.log(response);
        let tokenName = "csrf_access_token";
        let currentToken = "";
        const value = document.cookie;
        const parts = value.split(`; ${tokenName}=`);
        if (parts.length === 2) {
          currentToken = parts.pop().split(";").shift();
        }
        return { ...response.data, accessToken: currentToken };
      });
  }

  logout() {
    //TokenService.removeUser();
  }

  reset_password({ email, oldPassword, newPassword, token }) {
    try {
      return api
        .post(
          `/user/reset_password/`,
          {
            email: email,
            password: oldPassword,
            new_password: newPassword,
          },
          {
            headers: { "X-CSRF-TOKEN": token },
          }
        )
        .then(
          (response) => {
            //console.log("Promise::solved ", response);
            return response.data;
          },
          (error) => {
            //console.log("Promise::rejected", error);
            return error.response.data;
          }
        )
        .catch(function (error) {
          //console.log("catch error :: ", error.response.data);
          return error.response.data;
        });
    } catch (e) {
      console.log("catch error :: ", e);
    }
  }
}

export default new AuthService();
