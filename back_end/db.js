const config = require("./config");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectionString = config.mongo.connectionString;
const models = require("./models");
const User = models.user;
const Role = models.role;
const Department = models.department;

if (!connectionString) {
  console.error("MongoDB connection string missing!");
  process.exit(1);
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB error: " + err.message);
  process.exit(1);
});

db.once("open", () => {
  console.log("MongoDB connection established");
  initRole();
  initDepartment();
});

const initRole = () => {
  Role.find()
    .then(async (roles) => {
      if (roles.length) return;
      const newRoles = [
        { role_name: "Admin" },
        { role_name: "Department" },
        { role_name: "Student" },
      ];
      await Role.insertMany(newRoles);
      Role.findOne({ role_name: "Admin" }, (err, role) => {
        initAdmin(role._id);
      });
    })
    .catch((err) => {
      return console.log(err);
    });
};

const initDepartment = () => {
  Department.find((err, departments) => {
    if (err) return console.error(err);
    if (departments.length) return;
    const newDepartments = [
      { department_name: "Phòng Công tác học sinh sinh viên" },
      { department_name: "Phòng Đại học" },
      { department_name: "Phòng Sau đại học" },
      { department_name: "Phòng điện toán và máy tính" },
      { department_name: "Phòng khảo thí và kiểm định chất lượng" },
      { department_name: "Phòng tài chính" },
      { department_name: "TDT Creative Language Center" },
      { department_name: "Trung tâm tin học" },
      { department_name: "Trung tâm đào tạo phát triển xã hội" },
      {
        department_name:
          "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ",
      },
      { department_name: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên" },
      { department_name: "Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa" },
      { department_name: "Viện chính sách kinh tế và kinh doanh" },
      { department_name: "Khoa Luật" },
      { department_name: "Khoa Mỹ thuật công nghiệp" },
      { department_name: "Khoa Điện – Điện tử" },
      { department_name: "Khoa Công nghệ thông tin" },
      { department_name: "Khoa Quản trị kinh doanh" },
      { department_name: "Khoa Môi trường và bảo hộ lao động" },
      { department_name: "Khoa Lao động công đoàn" },
      { department_name: "Khoa Tài chính ngân hàng" },
      { department_name: "Khoa giáo dục quốc tế" },
    ];
    Department.insertMany(newDepartments);
  });
};

const initAdmin = (role_id) => {
  User.find()
    .then((users) => {
      if (users.length) return;
      const newAdmins = [
        {
          username: "Admin1",
          password: bcrypt.hashSync("123456", 10),
          role_id: role_id,
        },
        {
          username: "Admin2",
          password: bcrypt.hashSync("123456", 10),
          role_id: role_id,
        },
      ];
      User.insertMany(newAdmins);
    })
    .catch((err) => {
      return console.error(err);
    });
};
