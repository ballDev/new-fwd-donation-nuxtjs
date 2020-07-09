<template>
  <div class="main-container-4">
    <div v-if="showCpn" class="container">
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="col-12">
              <div class="col-xs-12 col-sm-6">
                <h3 class="title-text text-left">โปรไฟล์ของฉัน</h3>
              </div>
              <div class="col-xs-12 col-sm-6 txt-topic">
                <v-btn @click="navEditProfile()" class="btn-or" style="margin-right:10px">แก้ไข</v-btn>
                <v-btn v-if="showBtnEditPwd" @click="navRePassword()" class="btn-or">เปลี่ยนรหัสผ่าน</v-btn>
              </div>

              <!-- <div class="form-inline col-12">
                <div class="col-12 col-sm-3 col-md-2 block-left">
                  <label class="base-txt-16 font-profile1">ชื่อ-นามสกุล</label>
                </div>
                <div class="col-12 col-sm-9 col-md-10">
                  <label class="base-txt-16 font-profile2">{{firstName}} {{lastName}}</label>
                </div>
              </div>
              <div class="cleaner"></div>

              <div class="form-inline col-12">
                <div class="col-12 col-sm-3 col-md-2 block-left">
                  <label class="base-txt-16 font-profile1">เพศ</label>
                </div>
                <div class="col-12 col-sm-9 col-md-10">
                  <label class="base-txt-16 font-profile2">{{gender}}</label>
                </div>
              </div>
              <div class="cleaner"></div>

              <div class="form-inline col-12">
                <div class="col-12 col-sm-3 col-md-2 block-left">
                  <label class="base-txt-16 font-profile1">วัน/เดือน/ปีเกิด</label>
                </div>
                <div class="col-12 col-sm-9 col-md-10">
                  <label class="base-txt-16 font-profile2">{{birthDate|formatDate}}</label>
                </div>
              </div>
              <div class="cleaner"></div>

              <div class="form-inline col-12">
                <div class="col-12 col-sm-3 col-md-2 block-left">
                  <label class="base-txt-16 font-profile1">อีเมล</label>
                </div>
                <div class="col-12 col-sm-9 col-md-10">
                  <label class="base-txt-16 font-profile2">{{email}}</label>
                </div>
              </div>
              <div class="cleaner"></div>-->

              <div class="h30"></div>

              <div class="col-xs-12 col-sm-3 col-md-4 col-lg-4 text-center">
                <img
                  v-if="!img"
                  src="../assets/images/blank-profile.png"
                  alt="profile"
                  class="img-profile"
                />
                <img v-else v-bind:src="img" alt="profile" class="img-profile" />
              </div>
              <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 txt-topic center-xs">
                  <label class="base-txt-16 font-profile1">ชื่อ-นามสกุล</label>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 center-xs">
                  <label class="base-txt-16 font-profile2">{{firstName}} {{lastName}}</label>
                </div>
                <div class="h25 visible-lg"></div>
                <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 txt-topic center-xs">
                  <label class="base-txt-16 font-profile1">เพศ</label>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 center-xs">
                  <label class="base-txt-16 font-profile2">{{gender|formatGender}}</label>
                </div>
                <div class="h25 visible-lg"></div>
                <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 txt-topic center-xs">
                  <label class="base-txt-16 font-profile1">วัน/เดือน/ปีเกิด</label>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 center-xs">
                  <label class="base-txt-16 font-profile2">{{birthDate|formatDate}}</label>
                </div>
                <div class="h25 visible-lg"></div>
                <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 txt-topic center-xs">
                  <label class="base-txt-16 font-profile1">อีเมล</label>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 center-xs">
                  <label class="base-txt-16 font-profile2">{{email}}</label>
                </div>
                <div class="h25 visible-lg"></div>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import conf from "@/config/config.json";
import apiService from "@/services/api-services";
import moment from "moment";
export default {
  name: "Profile",
  data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      email: "",
      img: "",
      typeLogin: "",
      showBtnEditPwd: false,
      showCpn: false
    };
  },
  created() {},
  mounted() {
    document.title = `โปรไฟล์ของฉัน - ${conf.title_project}`;
    this.reqProfile();
  },
  methods: {
    reqProfile() {
      apiService
        .onGetProfile()
        .then(res => {
          console.log(res);
          this.firstName = res.data.resultData.firstName;
          this.lastName = res.data.resultData.lastName;
          this.gender = res.data.resultData.gender;
          this.birthDate = res.data.resultData.birthDate;
          this.email = res.data.resultData.email;
          this.img = res.data.resultData.image;
          // this.typeLogin = res.data.resultData.auth[0].provider;
          const i = res.data.resultData.auth.findIndex(
            f => f.provider == "email"
          );
          if (i > -1) {
            this.showBtnEditPwd = true;
          }
          this.showCpn = true;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/page-not-found?case=user");
          }
        });
    },
    navRePassword() {
      this.$router.push("/renew-password");
    },
    navEditProfile() {
      this.$router.push("/edit-profile");
    }
  },
  filters: {
    formatDate(value) {
      if (!value) return "-";
      const date = new Date(value);
      const d = moment(date).format("DD");
      const m = moment(date)
        .locale("th")
        .format("MMMM");
      const y = (
        Number(
          moment(date)
            .locale("th")
            .format("YYYY")
        ) + 543
      ).toString();
      const formatDate = `${d} ${m} ${y}`;
      return formatDate;
    },
    formatGender(value) {
      if (!value) return "-";
      switch (value) {
        case "Male":
          return "ชาย";
        case "Female":
          return "หญิง";
        default:
          return value;
      }
    }
  }
};
</script>

<style scoped>
.block-left {
  text-align: right;
}
.font-profile1 {
  text-align: right;
  font-size: 20px;
  font-family: Anakotmai;
  color: #6d7278;
}
.font-profile2 {
  font-size: 20px;
  font-family: Anakotmai;
  color: #bfbfbf;
}
.cleaner {
  clear: both;
}
.btn-or {
  background: #f47833 !important;
  color: #ffffff !important;
}
.img-profile {
  max-height: 200px;
}
.h25 {
  clear: both;
  height: 25px;
}

.col-sm-3,
.col-sm-9 {
  padding: 0 12px;
}
.txt-topic {
  text-align: right;
}
@media screen and (max-width: 767px) {
  .block-left {
    text-align: left;
  }
  .font-profile1 {
    text-align: left;
  }
  .font-profile1,
  .font-profile2 {
    font-size: 14px;
  }
  .center-xs {
    text-align: center !important;
  }
}
</style>
