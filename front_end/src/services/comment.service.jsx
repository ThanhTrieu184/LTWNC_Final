import Repository from "./repository";

class CommentService {
  async createNewComment(value) {
    const endpoint = "/comments/create";
    const response = await Repository.post(endpoint, value);
    return response;
  }
  async getComments(postId) {
    const endpoint = `/comments/${postId}`;
    const response = await Repository.get(endpoint);
    return response;
  }

  async updateComment(values) {
    const endpoint = `/comments/${values.commentId}/edit`;
    const response = await Repository.patch(endpoint, values);
    return response;
  }
  async deleteComment(commentId) {
    const endpoint = `/comments/${commentId}/delete`;
    const response = await Repository.delete(endpoint);
    return response;
  }
}

export default new CommentService();
