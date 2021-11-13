import Repository from "./repository";

class AuthService {
  async login(credentials) {
    const endpoint = "/auth/login";
    const response = await Repository.post(endpoint, credentials);
    return response;
  }

  async loginGoogle(credentials) {
    const endpoint = "/auth/login-google";
    const response = await Repository.post(endpoint, credentials);
    return response;
  }

  async logout() {
    const endpoint = "/auth/logout";
    const response = await Repository.delete(endpoint);
    return response;
  }
}

export default new AuthService();
