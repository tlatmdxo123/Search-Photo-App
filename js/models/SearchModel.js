import Api from "../api/api.js";

const api = new Api();

export default {
  list(query) {
    return new Promise((res) => {
      const data = api.fetchSearchData(query);
      res(data);
    });
  },

  fetchMoreData(){
    return new Promise(res => {
      const data = api.getMoreData()
      res(data)
    })
  }
};
