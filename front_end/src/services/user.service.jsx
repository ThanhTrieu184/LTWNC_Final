import Repository from "./repository";

class UserService {
  async changePassword(passwords) {
    const endpoint = "/users/changePass";
    const response = await Repository.post(endpoint, passwords);
    return response;
  }
  async createNewUser(credentials) {
    const endpoint = "/users/create";
    const response = await Repository.post(endpoint, credentials);
    return response;
  }
  async updateProfile(credentials) {
    const endpoint = "/users/update";
    const response = await Repository.post(endpoint, credentials);
    return response;
  }
}

export default new UserService();
