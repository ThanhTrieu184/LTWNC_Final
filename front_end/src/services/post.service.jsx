import Repository from "./repository";

class PostService {
  async createNewPost(info) {
    const endpoint = "/posts/create";
    const response = await Repository.post(endpoint, info);
    return response;
  }
  async getPosts(page) {
    const endpoint = `/posts/${page}`;
    const response = await Repository.get(endpoint);
    return response;
  }
  async getPostById(postId) {
    const endpoint = `/posts/${postId}/detail`;
    const response = await Repository.get(endpoint);
    return response;
  }
  async updatePost(postId, values) {
    const endpoint = `/posts/${postId}/edit`;
    const response = await Repository.patch(endpoint, values);
    return response;
  }
  async deletePost(postId) {
    const endpoint = `/posts/${postId}/delete`;
    const response = await Repository.delete(endpoint);
    return response;
  }
  async getProfilePosts(userId, page) {
    const endpoint = `/posts/${userId}/profile/${page}`;
    const response = await Repository.get(endpoint);
    return response;
  }
}

export default new PostService();
