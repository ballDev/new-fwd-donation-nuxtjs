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
                <v-btn @click="navBack()" class="btn-cancel" style="margin-right:10px">ยกเลิก</v-btn>
                <v-btn @click="submit()" class="btn-confirm">บันทึก</v-btn>
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
                <div class="block-img-profile">
                  <img
                    v-if="!img"
                    src="../assets/images/blank-profile.png"
                    alt="profile"
                    class="img-profile"
                  />
                  <img v-else v-bind:src="img" alt="profile" class="img-profile" />
                  <div class="icon-upload-img">
                    <i @click="$refs.profile.click()" class="fa fa-camera" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  @change="onChangeUploadProfile"
                  style="display:none"
                  type="file"
                  ref="profile"
                  accept=".jpg, .png, .jpeg"
                />
              </div>
              <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic">
                    <label class="base-txt-16 font-profile1">ชื่อ</label>
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 center-xs">
                    <v-text-field :rules="[rules.required]" v-model="firstName" outlined></v-text-field>
                  </div>
                  <!-- <div class="h25"></div> -->
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic">
                    <label class="base-txt-16 font-profile1">นามสกุล</label>
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 center-xs">
                    <v-text-field :rules="[rules.required]" v-model="lastName" outlined></v-text-field>
                  </div>
                  <!-- <div class="h25"></div> -->
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic">
                    <label class="base-txt-16 font-profile1">เพศ</label>
                  </div>
                  <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9 center-xs">
                    <v-radio-group v-model="gender" row>
                      <v-radio color="#f47832" label="ชาย" value="Male"></v-radio>
                      <v-radio color="#f47832" label="หญิง" value="Female"></v-radio>
                      <v-radio color="#f47832" label="LGBT" value="LGBT"></v-radio>
                    </v-radio-group>
                  </div>
                  <!-- <div class="h25"></div> -->
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic">
                    <label class="base-txt-16 font-profile1">วัน/เดือน/ปีเกิด</label>
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 center-xs">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      in-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="dateShow" readonly v-on="on" outlined></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        locale="th-th"
                        v-model="birthDate"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                      <!-- ข้างบนมี@change="save" -->
                    </v-menu>
                  </div>
                  <!-- <div class="h25"></div> -->
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic">
                    <label class="base-txt-16 font-profile1">อีเมล</label>
                  </div>
                  <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                    <label class="base-txt-16 font-profile2">{{email}}</label>
                  </div>
                  <!-- <div class="h25"></div> -->
                </v-form>
                <v-dialog v-model="dialogWarn" max-width="400">
                  <v-card>
                    <div class="block-modal">
                      <div class="text-center base-txt-18 color-red">พบข้อผิดพลาด</div>
                      <div class="h10"></div>
                      <div class="text-center base-txt-16 color-grey">กรุณากรอกข้อมูลให้ครบถ้วน</div>
                      <div class="h10"></div>
                      <div class="text-center">
                        <div @click="dialogWarn = false" class="btn-modal">ปิด</div>
                      </div>
                    </div>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/api-services";
import moment from "moment";
import conf from "@/config/config.json";
import util from "@/services/util";
import AWS from "aws-sdk";
import manageData from "@/services/manage-data";
export default {
  name: "EditProfile",
  data() {
    return {
      memberDetail: null,
      memberId: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      dateShow: "",
      email: "",
      img: "",
      menu: "",
      dialogWarn: false,
      valid: true,
      lazy: true,
      rules: {
        required: value => !!value || "โปรดระบุค่า"
      },
      showCpn: false
    };
  },
  created() {},
  mounted() {
    document.title = `แก้ไขโปรไฟล์ - ${conf.title_project}`;
    this.reqProfile();
  },
  methods: {
    navBack() {
      this.$router.push("/profile");
    },
    reqProfile() {
      apiService
        .onGetProfile()
        .then(res => {
          console.log(res);
          this.memberDetail = res.data.resultData;
          this.memberId = res.data.resultData._id;
          this.firstName = res.data.resultData.firstName;
          this.lastName = res.data.resultData.lastName;
          this.gender = res.data.resultData.gender;
          this.birthDate = res.data.resultData.birthDate;
          this.email = res.data.resultData.email;
          this.img = res.data.resultData.image;
          this.dateShow = this.setDateShow(this.birthDate);
          this.showCpn = true;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/page-not-found?case=user");
          }
        });
    },
    save(date) {
      this.$refs.menu.save(date);
      this.dateShow = this.setDateShow(date);
    },
    setDateShow(date) {
      if (!date) {
        return "";
      }
      const dm = moment(date)
        .locale("th")
        .format("Do MMMM");
      const y = (
        Number(
          moment(date)
            .locale("th")
            .format("YYYY")
        ) + 543
      ).toString();
      return `${dm} ${y}`;
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.reqUpdateProfile();
      } else {
        this.dialogWarn = true;
      }
    },
    reqUpdateProfile() {
      const req = {
        // firstName: this.firstName,
        // lastName: this.lastName,
        // birthDate: this.birthDate,
        // gender: this.gender,
        // image: this.img,
        // status: this.memberDetail.status,
        // auth: this.memberDetail.auth
      };
      if (this.memberDetail.firstName != this.firstName) {
        req.firstName = this.firstName;
      }
      if (this.memberDetail.lastName != this.lastName) {
        req.lastName = this.lastName;
      }
      if (this.memberDetail.birthDate != this.birthDate) {
        req.birthDate = this.birthDate;
      }
      if (this.memberDetail.gender != this.gender) {
        req.gender = this.gender;
      }
      if (this.memberDetail.image != this.img) {
        req.image = this.img;
      }
      // const req = this.memberDetail;
      // req.firstName = this.firstName;
      // req.lastName = this.lastName;
      // req.birthDate = this.birthDate;
      // req.gender = this.gender;
      // req.image = this.img;
      console.log(req);
      apiService
        .onPatchMember(req)
        .then(res => {
          console.log(res);
          manageData.updateUploadProfile(true);
          this.navBack();
        })
        .catch(err => {
          console.log(err);
        });
    },

    onChangeUploadProfile(e) {
      const file = e.target.files[0];
      this.uploadProfileAws3(file);
      // console.log(file);
    },
    uploadProfileAws3(file) {
      const s3 = new AWS.S3({
        accessKeyId: conf.aws_s3.accessKeyId,
        secretAccessKey: conf.aws_s3.secretAccessKey,
        endpoint: conf.aws_s3.endpoint,
        region: conf.aws_s3.region
      });

      const digitDate = moment().format("DDMMYY");
      const str = util.genString(6);
      const imgDecode = file;
      const key = `${conf.partnerId}/members/image/${digitDate}${str}`;
      var params = {
        Body: imgDecode,
        Bucket: "evolka-fwpapp-prod",
        Key: key,
        ACL: "public-read"
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          this.img = data.Location;
        }
      });
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
.col-sm-7,
.col-sm-9 {
  padding: 0 12px;
}
.txt-topic {
  text-align: right;
}
.btn-confirm {
  background: #f47833 !important;
  color: #ffffff !important;
}
.btn-cancel {
  background: #ffffff !important;
  color: #f47833 !important;
}
.v-input--selection-controls {
  margin-top: 0px;
}
.v-menu__content {
  min-width: inherit !important;
}
.block-img-profile {
  position: relative;
  display: inline-block;
}
.block-img-profile .icon-upload-img {
  position: absolute;
  bottom: 0px;
  right: 5px;
  cursor: pointer;
}
.block-modal {
  padding: 20px 20px;
}

.block-modal .btn-modal {
  background: #f47932;
  padding: 5px 20px;
  display: inline-block;
  font-size: 14px;
  color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
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
  .txt-topic {
    text-align: left;
  }
}
</style>
