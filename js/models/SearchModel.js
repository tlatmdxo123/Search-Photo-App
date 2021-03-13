import Api from "../api/api.js";

const api = new Api();

export default {
  list(query) {
    return new Promise((res) => {
      const data = api.fetchSearchData(query);
      console.log(data);
      res(data);
    });
  },
};
