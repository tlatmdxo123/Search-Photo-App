import {setCookie,getCookie} from '../util/cookie.js'

//client_id=YOUR_ACCESS_KEY
export default class Api {
  constructor() {
    this.ACCESS_KEY = "rHRDeKW7lQYCMzaUaK5n9B9fdOI_PhtXh6PjcssAsfg";
    this.axios = axios.create({
      baseURL: "https://api.unsplash.com/",
    });
    this.page = 0

  }

  fetchSearchData(query,filter) {
    this.setPage(query,filter)
    return this.axios.get("search/photos", {
      params: { client_id: this.ACCESS_KEY, query,...filter },
    });
  }

  getData(id) {
    return this.axios.get(`/photos/${id}`, {
      params: { client_id: this.ACCESS_KEY, id },
    });
  }

  setPage(query,filter){
    this.page = 0
    const strFilter = JSON.stringify(filter)
    setCookie("query",query,{'max-age':3600})
    setCookie("filter",strFilter,{'max-age':3600})

  }


  getMoreData(){
    if(getCookie("query")){
      const query = getCookie("query")
      const filter = JSON.parse(getCookie("filter"))
      this.page+=1
      console.log('getMoreData',this.page);
      return this.axios.get("search/photos", {
        params: { 
          client_id: this.ACCESS_KEY,
          query,
          page:this.page,
          ...filter
        },
      });
    }else{
      return
    }
    
    
  }
}
