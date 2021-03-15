import Api from "../api/api.js";

const api = new Api();

export default {
  list(id) {
    return new Promise((res) => {
      const data = api.getData(id);
      res(data);
    });
  },
};
