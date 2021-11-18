import Repository from "./repository";

class DepartmentService {
  async getAllDepartments() {
    const endpoint = "/departments/list";
    const response = await Repository.get(endpoint);
    return response;
  }
}

export default new DepartmentService();
