const models = require("../../models");
const moment = require("moment");
const Announcement = models.announcement;

exports.createNewAnnouncement = async (req, res) => {
  const io = req.app.get("socketio");

  const { announcementTitle, announcementContent, department, isImportant } =
    req.body;
  const announcement = new Announcement({
    announcement_title: announcementTitle,
    announcement_content: announcementContent,
    published_date: moment().format("DD/MM/YYYY-hh:mm:ss"),
    department_id: department._id,
    published_by: req.userId,
    is_important: isImportant,
  });

  announcement.save(async (err, a) => {
    let result = await Announcement.populate(a, {
      path: "department_id",
      select: ["department_name"],
    });
    if (err) {
      return res.status(500).send({ message: "Tạo thông báo thất bại!" });
    }
    io.emit("newAnnouncement", {
      departmentName: result.department_id.department_name,
      announcementId: result._id,
    });
    return res.status(201).send({
      message: "Tạo thông báo thành công",
      announcement: result,
    });
  });
};

exports.getAnnouncements = async (req, res) => {
  const perPage = 10;
  const page = req.params.page || 1;
  const condition = {};
  const departmentId = req.params.departmentId;
  if (departmentId) condition.department_id = departmentId;
  Announcement.find(condition)
    .sort({ _id: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate("department_id", ["department_name"])
    .exec((err, announcements) => {
      if (err) {
        return res.status(500).send("Có lỗi khi tải thông báo!");
      }
      Announcement.countDocuments(condition, (err, count) => {
        if (err) return res.status(500).send("Có lỗi khi tải thông báo!");
        if (page > Math.ceil(count / perPage))
          return res.status(400).send("Vượt quá số trang hiện có!");
        res.status(200).send({
          message: "Tải thông báo thành công",
          announcements: announcements,
          count: count,
        });
      });
    });
};

exports.updateAnnouncement = async (req, res) => {
  const { announcementTitle, announcementContent, department, isImportant } =
    req.body;
  const { announcementId } = req.params;
  const announcement = {
    announcement_title: announcementTitle,
    announcement_content: announcementContent,
    announcement_updated_at: moment().format("DD/MM/YYYY-hh:mm:ss"),
    department_id: department._id,
    announcement_updated_by: req.userId,
    is_important: isImportant,
  };
  Announcement.updateOne({ _id: announcementId }, { $set: announcement })
    .then((a) => {
      announcement._id = announcementId;
      return res.status(200).send({
        message: "Cập nhật thông báo thành công",
        announcement: announcement,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Cập nhật thông báo thất bại",
      });
    });
};

exports.getAnnouncementById = async (req, res) => {
  const { announcementId } = req.params;
  Announcement.findById(announcementId)
    .populate("department_id", ["department_name"])
    .exec((err, announcement) => {
      if (err) {
        return res.status(500).send("Có lỗi khi tải thông báo!");
      }
      res.status(200).send({
        message: "Tải thông báo thành công",
        announcement: announcement,
      });
    });
};

exports.deleteAnnouncement = async (req, res) => {
  const { announcementId } = req.body;
  Announcement.findByIdAndDelete(announcementId, (err, announcement) => {
    if (err) {
      return res.status(500).send({ message: "Có lỗi khi xóa thông báo!" });
    }
    if (announcement) {
      return res.status(200).send({
        message: "Xóa thông báo thành công",
        deletedAnnouncement: announcement,
      });
    }
    res.status(404).send({
      message: "Không tìm thấy thông báo!",
    });
  });
};
