import Repository from "./repository";

class UserService {
  async changePassword(passwords) {
    const endpoint = "/users/changePass";
    const response = await Repository.post(endpoint, passwords);
    return response;
  }
}

export default new UserService();
