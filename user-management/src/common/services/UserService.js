import axios from "axios";

const TOKEN =
  "091be23f817969e0dad3a5e0549de52d44198144ed2eb9e30302ccbac19f316c";

class UserService {
  constructor() {
    this.baseUrl = "https://gorest.co.in/public/v2";
  }

  getAll() {
    const url = `${this.baseUrl}/users`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  add(data) {
    const url = `${this.baseUrl}/users/`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  delete(userId) {
    const url = `${this.baseUrl}/users/${userId}`;
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  update(userId, data) {
    const url = `${this.baseUrl}/users/${userId}`;
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }
}

export default UserService;
