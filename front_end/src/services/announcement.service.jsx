import Repository from "./repository";

class AnnouncementService {
  async createNewAnnouncement(info) {
    const endpoint = "/announcements/create";
    const response = await Repository.post(endpoint, info);
    return response;
  }
  async getAnnouncements(page) {
    const endpoint = `/announcements/${page}`;
    const response = await Repository.get(endpoint);
    return response;
  }
  async getHomePageAnnouncements() {
    const endpoint = "/announcements/1";
    const response = await Repository.get(endpoint);
    return response;
  }
  async getAnnouncementsByDepartment(departmentId, page) {
    const endpoint = `/announcements/${departmentId}/${page}`;
    const response = await Repository.get(endpoint);
    return response;
  }
  async getAnnouncementById(announcementId) {
    const endpoint = `/announcements/${announcementId}/detail`;
    const response = await Repository.get(endpoint);
    return response;
  }
}

export default new AnnouncementService();
