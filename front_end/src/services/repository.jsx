import axios from "./base.service";

const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    return "";
  }
};

const getHeaders = () => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};

const returnSuccess = (res) => {
  return {
    code: res.status,
    message: res.statusText,
    data: res.data,
  };
};

const returnFailure = (err) => {
  return {
    code: err.response.status,
    message: err.response.data.message,
    data: null,
  };
};

class Repository {
  async get(endpoint, data) {
    const response = await axios
      .get(`${endpoint}`, {
        headers: getHeaders(),
        params: data,
      })
      .then((res) => {
        return returnSuccess(res);
      })
      .catch((err) => {
        return returnFailure(err);
      });
    return response;
  }

  async post(endpoint, data) {
    const response = await axios
      .post(`${endpoint}`, data, {
        headers: getHeaders(),
      })
      .then((res) => {
        return returnSuccess(res);
      })
      .catch((err) => {
        return returnFailure(err);
      });
    return response;
  }

  async put(endpoint, data) {
    const response = await axios
      .put(`${endpoint}`, data, {
        headers: getHeaders(),
      })
      .then((res) => {
        return returnSuccess(res);
      })
      .catch((err) => {
        return returnFailure(err);
      });
    return response;
  }

  async patch(endpoint, data) {
    const response = await axios
      .patch(`${endpoint}`, data, {
        headers: getHeaders(),
      })
      .then((res) => {
        return returnSuccess(res);
      })
      .catch((err) => {
        return returnFailure(err);
      });
    return response;
  }

  async delete(endpoint, data) {
    const response = await axios
      .delete(`${endpoint}`, {
        data: data,
        headers: getHeaders(),
      })
      .then((res) => {
        return returnSuccess(res);
      })
      .catch((err) => {
        return returnFailure(err);
      });
    return response;
  }
}

export default new Repository();
