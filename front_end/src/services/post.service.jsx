import Repository from "./repository";

class PostService {
  async createNewPost(info) {
    const endpoint = "/posts/create";
    const response = await Repository.post(endpoint, info);
    return response;
  }
  async getPosts() {
    const endpoint = "/posts/list";
    const response = await Repository.get(endpoint);
    return response;
  }
}

export default new PostService();
