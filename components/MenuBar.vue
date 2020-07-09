<template>
  <div>
    <!-- Desktop Ipad  -->
    <div class="menu hidden-xs">
      <nav class="navbar navbar-default mainNav bg-secondary">
        <div class="container p0">
          <div class="navbar-header">
            <div class="logo">
              <router-link to="/">
                <img src="../assets/images/logo-kawklai-white.png" width="200" alt="Homepage logo" />
              </router-link>
            </div>
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-menu"
              aria-expanded="false"
            >
              <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
          <div class="visible-xs" style="clear:both;height:10px"></div>
          <div class="navbar-right">
            <div id="navbar-menu" class="collapse navbar-collapse">
              <ul class="nav navbar-nav" data-in="fadeInDown" data-out="fadeOutUp">
                <div class="visible-xs" style="clear:both;height:40px"></div>
                <!-- <li class="dropdown">
                                <router-link to="/" class="dropdown-toggle" data-toggle="dropdown"
                                   role="button" aria-expanded="false" title="Home">หน้าเเรก</router-link>
                </li>-->
                <li class="dropdown features-menu">
                  <router-link
                    to="/"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >โครงการทั้งหมด</router-link>
                </li>
                <!-- <li class="dropdown">
                                <router-link to="/payment" class="dropdown-toggle" data-toggle="dropdown"
                                   role="button" aria-expanded="false" title="News">เเจ้งชำระเงิน</router-link>
                </li>-->
                <li class="dropdown">
                  <router-link
                    to="/contact"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >ติดต่อเรา</router-link>
                </li>
                <li class="dropdown hidden-xs" style="font-weight:100">
                  <h1 style="color:#fff;">|</h1>
                </li>
                <li class="dropdown">
                  <router-link
                    v-if="!login"
                    to="/login"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >เข้าสู่ระบบ</router-link>
                </li>
                <li v-if="login" class="dropdown">
                  <a class="dropbtn" data-toggle="dropdown" role="button" aria-expanded="false">
                    <div v-if="hint > 0" class="hint"></div>
                    <span style="font-size:18px">{{profileName}} &nbsp;</span>
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                  </a>
                  <ul class="dropdown-content" role="menu">
                    <li>
                      <router-link to="/profile">โปรไฟล์ของฉัน</router-link>
                    </li>
                    <li class="block-hint">
                      <router-link to="/confirm-payment">
                        <div v-if="hint > 0" class="hint">{{hint}}</div>แจ้งชำระเงิน
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/history">ประวัติการบริจาค</router-link>
                    </li>
                    <li>
                      <a v-on:click="onClickLogout()">ออกจากระบบ</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!-- Desktop Ipad  -->

    <!-- Mobile -->
    <div class="menuBar visible-xs">
      <nav class="navbar navbar-default mainNav bg-secondary">
        <div class="container p0">
          <div class="navbar-header">
            <div class="logo">
              <router-link to="/">
                <img src="../assets/images/logo-kawklai-white.png" width="200" alt="Homepage logo" />
              </router-link>
            </div>
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-menu"
              aria-expanded="false"
              @click="toggle()"
            >
              <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
          <div class="visible-xs" style="clear:both;height:10px"></div>
          <div class="navbar-right">
            <div
              id="navbar-menu"
              class="collapse navbar-collapse"
              v-bind:class="{'active': showToggle}"
            >
              <ul class="nav navbar-nav" data-in="fadeInDown" data-out="fadeOutUp">
                <div class="visible-xs" style="clear:both;height:0px"></div>
                <!-- <li class="dropdown">
                                <router-link to="/" class="dropdown-toggle" data-toggle="dropdown"
                                   role="button" aria-expanded="false" title="Home">หน้าเเรก</router-link>
                </li>-->
                <li class="dropdown features-menu" @click="toggle()">
                  <router-link
                    to="/"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >โครงการทั้งหมด</router-link>
                </li>
                <!-- <li class="dropdown">
                                <router-link to="/payment" class="dropdown-toggle" data-toggle="dropdown"
                                   role="button" aria-expanded="false" title="News">เเจ้งชำระเงิน</router-link>
                </li>-->
                <li class="dropdown" @click="toggle()">
                  <router-link
                    to="/contact"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                    title="Shop"
                  >ติดต่อเรา</router-link>
                </li>
                <li class="dropdown hidden-xs" style="font-weight:100">
                  <h1 style="color:#fff;">|</h1>
                </li>
                <li class="dropdown" @click="toggle()">
                  <router-link
                    v-if="!login"
                    to="/login"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                    title="Shop"
                  >เข้าสู่ระบบ</router-link>
                </li>
                <li v-if="login" class="dropdown">
                  <a class="dropbtn" data-toggle="dropdown" role="button" aria-expanded="false">
                    <div v-if="hint > 0" class="hint"></div>
                    <span style="font-size:18px">{{profileName}} &nbsp;</span>
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                  </a>
                  <ul class="dropdown-content" role="menu">
                    <li @click="toggle()">
                      <router-link to="/profile">โปรไฟล์ของฉัน</router-link>
                    </li>
                    <li @click="toggle()" class="block-hint">
                      <router-link to="/confirm-payment">
                        <div v-if="hint > 0" class="hint">{{hint}}</div>แจ้งชำระเงิน
                      </router-link>
                    </li>
                    <li @click="toggle()">
                      <router-link to="/history">ประวัติการบริจาค</router-link>
                    </li>
                    <li @click="toggle()">
                      <a v-on:click="onClickLogout()">ออกจากระบบ</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!-- Mobile -->

    <div class="height-menu"></div>
  </div>
</template>

<script>
import util from "@/services/util";
import apiService from "@/services/api-services";
import manageData from "@/services/manage-data";
export default {
  name: "MenuBar",
  data() {
    return {
      login: false,
      profileName: "",
      profile: null,
      showToggle: false,
      hint: 0,
      intervalHead: null
    };
  },
  mounted() {
    this.checkLogin();
    this.getHintNum();
  },
  methods: {
    onClickLogo() {
      this.$router.push("/");
    },
    checkLogin() {
      // console.log(util.getAccessToken());
      setInterval(() => {
        if (util.getAccessToken() != null) {
          if (this.login == true) {
            return;
          }
          this.login = true;
          this.reqGetProfile();
        } else {
          this.login = false;
          this.profileName = "";
        }
      }, 1000);
    },
    onClickLogout() {
      util.clearAccessToken();
      util.clearFacebookToken();
      util.clearUserDetail();
      this.login = false;
      this.$router.push("/");
    },
    reqGetProfile() {
      apiService
        .onGetProfile()
        .then(res => {
          console.log(res.data.resultData);
          this.profile = res.data.resultData;
          this.reqGetDonationPending();
          const profileName =
            res.data.resultData.firstName + " " + res.data.resultData.lastName;
          this.profileName = profileName;
          util.setUserDetail(this.profile);
          manageData.updateUploadProfile(false);
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            clearInterval(this.intervalHead);
            this.$router.push("/page-not-found?case=user");
          }
        });
    },
    toggle() {
      this.showToggle = !this.showToggle;
    },
    getHintNum() {
      this.hint = manageData.getHintNumSendSlip();
      this.intervalHead = setInterval(() => {
        this.hint = manageData.getHintNumSendSlip();
        if (manageData.getUpdateProfile()) {
          this.reqGetProfile();
        }
      }, 1000);
    },
    reqGetDonationPending() {
      apiService
        .onGetDonationByStatus(25, 1, "pending", this.profile._id)
        .then(res => {
          manageData.setHintNumSendSlip(res.data.rowCount);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.dropbtn {
  position: relative;
  background-color: #0c3455;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn .hint {
  position: absolute;
  top: 7px;
  right: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  background: #f47932;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #0c3455;
  min-width: 400px;
  box-shadow: 0px 8px 16px 0px #0c3455;
  z-index: 1;
  float: right;
  margin-left: -200px;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f47932;
  width: 100%;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  border-bottom: 2px solid #f47932;
}

.navbar-default .navbar-nav li {
  font-size: 18px;
}
.navbar-right {
  padding-top: 0px;
}
.mainNav {
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: inherit;
  margin-bottom: 0;
}
.main-container-4 {
  padding: 50px 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #0c3455;
  min-width: 400px;
  box-shadow: 0px 8px 16px 0px #0c3455;
  z-index: 1;
  float: right;
  padding-left: 0;
  right: 0;
}
/* @media screen and (max-width: 1920px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    padding-left: 0;
    margin-left: -320px;
  }
}
@media screen and (max-width: 1679px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -150px;
  }
}
@media screen and (max-width: 1600px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -220px;
  }
}
@media screen and (max-width: 1500px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -250px;
  }
}
@media screen and (max-width: 1460px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -330px;
  }
}
@media screen and (max-width: 1264px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -230px;
  }
}
@media screen and (max-width: 1200px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -250px;
  }
}
@media screen and (max-width: 1100px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -370px;
  }
}
@media screen and (max-width: 1000px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -370px;
  }
}
@media screen and (max-width: 900px) {
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #0c3455;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px #0c3455;
    z-index: 1;
    float: right;
    margin-left: -370px;
  }
} */

.collapse.active {
  display: block;
}

.block-hint {
  position: relative;
}

.block-hint .hint {
  position: absolute;
  left: 120px;
  top: 20px;
  font-size: 9px;
  background: #f47932;
  padding: 2px;
  width: 21px;
  height: 21px;
  border-radius: 30px;
  transition: 0.5s;
}

.block-hint:hover .hint {
  background: #0c3455;
}

@media screen and (max-width: 767px) {
  .menuBar {
    top: 0px;
    z-index: 1;
  }
  ul.nav.navbar-nav {
    max-width: 100%;
  }
  .v-application ul,
  .v-application ol {
    padding-left: 0px;
  }
  .navbar-default .navbar-nav li {
    display: block;
  }
  .dropdown-content {
    min-width: inherit;
    margin-left: 0px;
    width: 100%;
  }
  .navbar-default .navbar-brand {
    width: 60%;
  }
  .navbar-brand > img {
    max-width: 100%;
    height: auto;
  }
  .logo {
    display: inline-block;
    margin-left: 15px;
  }
  .height-menu {
    clear: both;
    height: 100px;
  }
  .navbar-default .navbar-toggle {
    top: 0;
  }
  .block-hint .hint {
    left: 20px;
  }
}
</style>
