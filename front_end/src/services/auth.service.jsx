import Repository from "./repository";

class AuthService {
  async login(credentials) {
    const endpoint = "/auth/login";
    const response = await Repository.post(endpoint, credentials);
    return response;
  }

  async logout(token) {
    const endpoint = "/auth/logout";
    const response = await Repository.delete(endpoint, token);
    return response;
  }
}

export default new AuthService();
