const { AnnouncementController } = require("../controllers/api");
const { verifyToken, isDepartment } = require("../middlewares/authJWT");
const { isDepartmentAbleToUpdate } = require("../middlewares/announcementRequest");

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
  app.patch(
    "/api/announcements/:announcementId/update",
    [verifyToken, isDepartment, isDepartmentAbleToUpdate],
    AnnouncementController.updateAnnouncement
  )
};
