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
  async updateAnnouncement(info) {
    const endpoint = `/announcements/${info.announcementId}/update`;
    const response = await Repository.patch(endpoint, info);
    return response;
  }
  async deleteAnnouncement(values) {
    const endpoint = `/announcements`;
    const response = await Repository.delete(endpoint, values);
    return response;
  }
}

export default new AnnouncementService();
