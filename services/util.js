import moment from "moment";
const utilResource = {

  genId(node) {
    let date = this.getCurrentDate();
    let string_length = Math.floor(Math.random() * 3) + 10;
    let str = "";
    str = this.genString(string_length);
    return node + "-" + date + str;
  },

  genSession() {
    let str = "";
    let len = 22;
    str = this.genString(len);
    return str;
  },

  genString(len) {
    let str = "";
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    for (let i = 0; i < len; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      str += chars.substring(rnum, rnum + 1);
    }
    return str;
  },

  getCurrentDate() {
    let date = moment().format("YYMMDD")
    return date
  },
  getHeaderNoLogin() {
    let xtid = utilResource.genId('CMS')
    let xession = utilResource.genSession()
    let options = {
      headers: {
        "Content-Type": "application/json",
        "x-session-id": xession,
        "x-tid": xtid
      }, data: {}
    }
    return options
  },

  setAccessToken(token) {
    localStorage.setItem('fwd-donation-fe-token', token);
  },

  getAccessToken() {
    return localStorage.getItem('fwd-donation-fe-token');
  },

  clearAccessToken() {
    localStorage.removeItem('fwd-donation-fe-token')
  },

  getHeaderLogin() {
    let xtid = utilResource.genId('CMS')
    let xession = utilResource.genSession()
    let xaccessToken = this.getAccessToken()
    let options = {
      headers: {
        "Content-Type": "application/json",
        "x-session-id": xession,
        "x-tid": xtid,
        "x-access-token": xaccessToken
      }, data: {}
    }
    return options
  },

  getHeaderLoginMMF() {
    let xtid = utilResource.genId('CMS')
    let xession = utilResource.genSession()
    let xaccessToken = this.getAccessToken()
    let options = {
      headers: {
        "Content-Type": "application/json",
        "x-session-id": xession,
        "x-tid": xtid,
        "authorization": xaccessToken
      }, data: {}
    }
    return options
  },

  setFacebookToken(token) {
    localStorage.setItem('fwd-donation-fe-facebook-token', token);
  },
  getFacebookToken() {
    return localStorage.getItem('fwd-donation-fe-facebook-token');
  },
  clearFacebookToken() {
    localStorage.removeItem('fwd-donation-fe-facebook-token');
  },

  setUserDetail(user) {
    localStorage.setItem("fwd-donation-fe-user-detail", JSON.stringify(user));
  },
  getUserDetail() {
    let strObj = localStorage.getItem("fwd-donation-fe-user-detail");
    return JSON.parse(strObj);
  },
  clearUserDetail() {
    localStorage.removeItem("fwd-donation-fe-user-detail");
  }

}
export default utilResource