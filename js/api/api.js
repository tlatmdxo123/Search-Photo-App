//client_id=YOUR_ACCESS_KEY
export default class Api {
  constructor() {
    this.ACCESS_KEY = "rHRDeKW7lQYCMzaUaK5n9B9fdOI_PhtXh6PjcssAsfg";
    this.axios = axios.create({
      baseURL: "https://api.unsplash.com/",
    });
    this.page = 0
  }

  fetchSearchData(query) {
    this.setPage(query)
    return this.axios.get("search/photos", {
      params: { client_id: this.ACCESS_KEY, query },
    });
  }

  getData(id) {
    return this.axios.get(`/photos/${id}`, {
      params: { client_id: this.ACCESS_KEY, id },
    });
  }

  setPage(query){
    this.page = 0
    document.cookie = `query = ${query}`

  }

  getCookie(name){
    const cookieList = document.cookie.split(';')
    const cookie = cookieList
      .map(cookie => cookie.split('='))
      .find(item => item[0] === name)[1]
    return cookie
  }

  getMoreData(){
    const query = this.getCookie("query")
    this.page+=1
    return this.axios.get("search/photos", {
      params: { 
        client_id: this.ACCESS_KEY,
        query,
        page:this.page
      },
    });
    
  }
}
