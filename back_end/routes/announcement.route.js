const { AnnouncementController } = require("../controllers/api");
const { verifyToken, isDepartment } = require("../middlewares/authJWT");
const {
  isDepartmentAbleToUpdate,
  isDepartmentAbleToDelete,
} = require("../middlewares/announcementRequest");

module.exports = (app) => {
  app.post(
    "/api/announcements/create",
    [verifyToken, isDepartment],
    AnnouncementController.createNewAnnouncement
  );
  app.get(
    "/api/announcements/:page",
    verifyToken,
    AnnouncementController.getAnnouncements
  );
  app.get(
    "/api/announcements/:announcementId/detail",
    verifyToken,
    AnnouncementController.getAnnouncementById
  );
  app.patch(
    "/api/announcements/:announcementId/update",
    [verifyToken, isDepartment, isDepartmentAbleToUpdate],
    AnnouncementController.updateAnnouncement
  );
  app.get(
    "/api/announcements/:departmentId/:page",
    verifyToken,
    AnnouncementController.getAnnouncements
  );
  app.delete(
    "/api/announcements",
    [verifyToken, isDepartment, isDepartmentAbleToDelete],
    AnnouncementController.deleteAnnouncement
  );
};
