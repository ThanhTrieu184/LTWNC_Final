const { AnnouncementController } = require("../controllers/api");
const { verifyToken, isDepartment } = require("../middlewares/authJWT");
// const { checkCreatePostRequest } = require("../middlewares/postRequest");

var cors = require("cors");

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
};
