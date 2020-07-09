<template>
  <div class="main-container-4">
    <div v-if="showCpn" class="container">
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="col-12">
              <div class="col-xs-12 col-sm-6">
                <h3 class="title-text text-left">เปลี่ยนรหัสผ่าน</h3>
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
                <img
                  v-if="!img"
                  src="../assets/images/blank-profile.png"
                  alt="profile"
                  class="img-profile"
                />
                <img v-else v-bind:src="img" alt="profile" class="img-profile" />
              </div>
              <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic left-xs">
                    <label class="base-txt-16 font-profile1">รหัสผ่านเดิม</label>
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">
                    <v-text-field
                      v-model="oldPassword"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      :rules="ruleOldPassword"
                      outlined
                    ></v-text-field>
                  </div>
                  <!-- <div class="h25"></div> -->
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic left-xs">
                    <label class="base-txt-16 font-profile1">รหัสผ่านใหม่</label>
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7" style="position:relative">
                    <v-text-field
                      v-model="newPassword"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      @click:append="show2 = !show2"
                      :rules="ruleNewPassword"
                      :keyup="checkHintPwd()"
                      outlined
                    ></v-text-field>
                    <div v-if="hint==1" class="hint">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</div>
                    <div v-else-if="hint==2" class="hint-red">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</div>
                    <div v-else class="hint-red"></div>
                  </div>
                  <!-- <div class="h25"></div> -->
                  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 txt-topic left-xs">
                    <label class="base-txt-16 font-profile1">ยืนยันรหัสผ่าน</label>
                  </div>
                  <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">
                    <v-text-field
                      v-model="confirmPassword"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show3 ? 'text' : 'password'"
                      @click:append="show3 = !show3"
                      :rules="ruleConfirmPassword"
                      outlined
                    ></v-text-field>
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
                <v-dialog v-model="dialogFail" max-width="400">
                  <v-card>
                    <div class="block-modal">
                      <div class="text-center base-txt-18 color-red">พบข้อผิดพลาด</div>
                      <div class="h10"></div>
                      <div
                        class="text-center base-txt-16 color-grey"
                      >รหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง</div>
                      <div class="h10"></div>
                      <div class="text-center">
                        <div @click="dialogFail = false" class="btn-modal">ปิด</div>
                      </div>
                    </div>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogSuccess" persistent max-width="400">
                  <v-card>
                    <div class="block-modal">
                      <div class="text-center base-txt-18 color-darkgreen">ดำเนินการสำเร็จ</div>
                      <div class="h10"></div>
                      <div
                        class="text-center base-txt-16 color-grey"
                      >รหัสผ่านของท่านถูกเปลี่ยนแปลงแล้ว</div>
                      <div class="h10"></div>
                      <div class="text-center">
                        <div @click="navBack()" class="btn-modal">กลับ</div>
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
import conf from "@/config/config.json";
import apiService from "@/services/api-services";
import moment from "moment";
export default {
  name: "EditPassword",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      memberId: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      email: "",
      img: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      ruleOldPassword: [
        v => !!v || "โปรดระบุค่า",
        v => v.length >= 6 || "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
      ],
      ruleNewPassword: [
        // v => !!v || "โปรดระบุค่า",
        // v => v.length >= 6 || "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
        v => v.length >= 6 || ""
      ],
      ruleConfirmPassword: [
        v => !!v || "โปรดระบุค่า",
        v => v.length >= 6 || "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        v => v === this.newPassword || "รหัสผ่านใหม่ไม่ตรงกัน"
      ],
      valid: true,
      lazy: true,
      dialogWarn: false,
      dialogSuccess: false,
      dialogFail: false,
      hint: 1,
      showCpn: false
    };
  },
  mounted() {
    document.title = `เปลี่ยนรหัสผ่าน - ${conf.title_project}`;
    this.reqProfile();
    apiService
      .onGetProfile()
      .then(res => {
        console.log(res);
        this.showCpn = true;
      })
      .catch(err => {
        console.log(err);
        if (err.response.status == 403) {
          this.$router.push("/page-not-found?case=user");
        }
      });
  },
  created() {},
  methods: {
    navBack() {
      this.$router.push("/profile");
    },
    reqProfile() {
      apiService
        .onGetProfile()
        .then(res => {
          console.log(res);
          this.memberId = res.data.resultData._id;
          this.firstName = res.data.resultData.firstName;
          this.lastName = res.data.resultData.lastName;
          this.gender = res.data.resultData.gender;
          this.birthDate = res.data.resultData.birthDate;
          this.email = res.data.resultData.email;
          this.img = res.data.resultData.image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkHintPwd() {
      if (this.newPassword.length >= 6) {
        this.hint = 1;
      } else if (this.newPassword.length > 0 && this.newPassword.length < 6) {
        this.hint = 2;
      } else {
        this.hint = 1;
      }
    },
    onPutChangePassword() {
      const req = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      console.log(req);
      apiService
        .onPutChangePassword(req, this.memberId)
        .then(res => {
          console.log(res);
          this.dialogSuccess = true;
          this.clearInput();
        })
        .catch(err => {
          console.log(err);
          this.dialogFail = true;
          this.clearInput();
        });
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.onPutChangePassword();
      } else {
        this.dialogWarn = true;
        this.clearInput();
      }
    },
    clearInput() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
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
.btn-confirm {
  background: #f47833 !important;
  color: #ffffff !important;
}
.btn-cancel {
  background: #ffffff !important;
  color: #f47833 !important;
}
.img-profile {
  max-height: 200px;
}
.h25 {
  clear: both;
  height: 25px;
}
.col-sm-3,
.col-sm-7 {
  padding: 0 12px;
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

.txt-topic {
  text-align: right;
}

.hint {
  position: absolute;
  font-size: 12px;
  color: #666666;
  bottom: 10px;
  left: 19px;
}
.hint-red {
  position: absolute;
  font-size: 12px;
  color: #ff5252;
  bottom: 10px;
  left: 19px;
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
}
</style>
