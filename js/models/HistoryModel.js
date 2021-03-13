import getNowDate from "../util/date.js";
export default {
  data: [
    {
      keyword: "coffee",
      date: "12.03",
    },
  ],

  list() {
    return Promise.resolve(this.data);
  },

  add(keyword = "") {
    if (this.data.length > 3) {
      this.data.pop();
    }
    keyword = keyword.trim();
    if (!keyword) return;
    if (this.data.some((item) => item.keyword === keyword)) {
      this.remove(keyword);
    }

    const date = getNowDate();
    this.data = [{ keyword, date }, ...this.data];
  },

  remove(keyword) {
    this.data = this.data.filter((item) => item.keyword !== keyword);
  },
};
