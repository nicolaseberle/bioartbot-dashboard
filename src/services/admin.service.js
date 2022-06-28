import api from "./api";
import convertUTCtoTimestamp from "../utils/convertDatetime";

class AdminService {
  getAllUsers() {
    return api.get("/user/get", { withCredentials: true });
  }

  createUser(email, password, role, token) {
    return api.post(
      "/user/create",
      {
        email: email,
        password: password,
        role: role,
      },
      { withCredentials: true,
        headers: { "X-CSRF-TOKEN": token } }
    );
  }

  updateRole(email, role, token) {
    return api.post(
      "/user/change_role",
      {
        email: email,
        role: role,
      },
      {
        headers: { "X-CSRF-TOKEN": token },
      }
    );
  }
  removeUser(id, utc_created_at, token) {
    console.log(utc_created_at);
    let created_at_timestamp = String(convertUTCtoTimestamp(utc_created_at));
    return api.put(
      `/user/remove/${id}/${created_at_timestamp}`,
      {},
      {
        headers: { "X-CSRF-TOKEN": token },
      }
    );
  }
  //This function is a duplicated in auth...
  resetPassword(email, oldPassword, newPassword, token) {
    return api.post(
      `/user/reset_password/`,
      {
        email: email,
        password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: { "X-CSRF-TOKEN": token },
      }
    );
  }

  sendInvitation(email, token) {
    return api.post(
      `/user/send_invitation/`,
      {
        email: email,
      },
      {
        headers: { "X-CSRF-TOKEN": token },
      }
    );
  }
}

export default new AdminService();
