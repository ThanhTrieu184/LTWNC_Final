import Repository from "./repository";

class PostService {
  async createNewPost(info) {
    const endpoint = "/posts/create";
    const response = await Repository.post(endpoint, info);
    return response;
  }
  async getPosts(page) {
    const endpoint = "/posts/" + page;
    const response = await Repository.get(endpoint);
    return response;
  }
}

export default new PostService();
