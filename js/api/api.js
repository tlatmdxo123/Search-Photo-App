//client_id=YOUR_ACCESS_KEY
export default class Api {
  constructor() {
    this.ACCESS_KEY = "rHRDeKW7lQYCMzaUaK5n9B9fdOI_PhtXh6PjcssAsfg";
    this.axios = axios.create({
      baseURL: "https://api.unsplash.com/",
    });
  }

  fetchSearchData(query) {
    return this.axios.get("search/photos", {
      params: { client_id: this.ACCESS_KEY, query },
    });
  }

  getData(id) {
    return this.axios.get(`/photos/${id}`, {
      params: { client_id: this.ACCESS_KEY, id },
    });
  }
}
