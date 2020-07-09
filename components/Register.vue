<template>
  <div>
    <div class="container-login100" v-bind:class="{'isSuccess': success}">
      <div class="main-container-4">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <div class="login100-form validate-form flex-sb flex-w">
            <h3 v-if="!success" class="login100-form-title p-b-32 text-center">สร้างบัญชีผู้ใช้</h3>
            <h3 v-else class="login100-form-title p-b-32 text-center">สร้างบัญชีผู้ใช้สำเร็จ</h3>
            <div v-if="!success">
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <!-- <v-text-field
								:rules="rules"
								counter="25"
								label="คำนำหน้าชื่อ"
								outlined
								style="border-radius:50px"
                      ></v-text-field>-->
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="firstName"
                        label="ชื่อ"
                        outlined
                        style="border-radius:50px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="lastName"
                        label="นามสกุล"
                        outlined
                        style="border-radius:50px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" style="padding-left:10px;padding-bottom:12px;">
                      <v-radio-group v-model="gender" :rules="[rules.required]" row>
                        <v-radio color="#f47832" label="ชาย" value="Male"></v-radio>
                        <v-radio color="#f47832" label="หญิง" value="Female"></v-radio>
                        <v-radio color="#f47832" label="LGBT" value="LGBT"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        in-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            :rules="[rules.required]"
                            v-model="dateShow"
                            label="วัน เดือน ปีเกิด"
                            readonly
                            v-on="on"
                            outlined
                            style="border-radius:50px"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          locale="th-th"
                          v-model="date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                        <!-- ข้างบนมี@change="save" -->
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        :rules="emailRules"
                        v-model="email"
                        label="อีเมล"
                        outlined
                        style="border-radius:50px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" style="position:relative">
                      <v-text-field
                        v-model="password"
                        :rules="pwd"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show3 ? 'text' : 'password'"
                        name="input-10-2"
                        label="รหัสผ่าน"
                        class="input-group--focused"
                        style="border-radius:50px"
                        outlined
                        @click:append="show3 = !show3"
                        :keyup="checkHintPwd()"
                      ></v-text-field>
                      <div v-if="hint==1" class="hint">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</div>
                      <div v-else-if="hint==2" class="hint-red">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</div>
                      <div v-else class="hint-red"></div>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="passwordConfirm"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="pwdConfirm"
                        :type="show3 ? 'text' : 'password'"
                        name="input-10-2"
                        label="ยืนยันรหัสผ่าน"
                        class="input-group--focused"
                        style="border-radius:50px"
                        outlined
                        @click:append="show3 = !show3"
                        @change="onValidate()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

              <v-dialog v-model="dialog" max-width="400">
                <v-card>
                  <div class="block-modal">
                    <div class="text-center base-txt-18 color-red">พบข้อผิดพลาด</div>
                    <div class="h10"></div>
                    <div class="text-center base-txt-16 color-grey">กรุณากรอกข้อมูลให้ครบถ้วน</div>
                    <div class="h10"></div>
                    <div class="text-center">
                      <div @click="dialog = false" class="btn-modal">ปิด</div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogCheckMail" max-width="400">
                <v-card>
                  <div class="block-modal">
                    <div class="text-center base-txt-18 color-red">พบข้อผิดพลาด</div>
                    <div class="h10"></div>
                    <div class="text-center base-txt-16 color-grey">อีเมลที่กรอก ถูกใช้งานไปแล้ว</div>
                    <div class="h10"></div>
                    <div class="text-center">
                      <div @click="dialogCheckMail = false" class="btn-modal">ปิด</div>
                    </div>
                  </div>
                </v-card>
              </v-dialog>

              <div class="container-login100-form-btn">
                <v-btn @click="submit" class="login100-form-btn mx-auto col-12">สมัครสมาชิก</v-btn>
              </div>
            </div>
            <div v-else style="text-align:center; font-size:20px;">กรุณายืนยันอีเมลเพื่อเข้าสู่ระบบ</div>
            <div class="divider-custom1">
              <div class="divider-custom1-line"></div>
            </div>
            <div class="row">
              <router-link to="/login" class="txt3 mx-auto mt-3">
                <h4 class="title-text">เข้าสู่ระบบ</h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conf from "@/config/config.json";
import apiService from "@/services/api-services";
import moment from "moment";
export default {
  name: "Register",
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      valid: true,
      lazy: true,
      dialog: false,
      dialogCheckMail: false,
      firstName: "",
      lastName: "",
      date: "",
      dateShow: "",
      gender: "",
      email: "",
      emailRules: [
        v => !!v || "โปรดระบุค่า",
        v => /.+@.+\..+/.test(v) || "รูปแบบอีเมลไม่ถูกต้อง"
      ],
      password: "",
      passwordConfirm: "",
      pwd: [v => v.length >= 6 || ""],
      pwdConfirm: [
        v => !!v || "โปรดระบุค่า",
        v => v.length >= 6 || "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        v => v == this.password || "รหัสผ่านไม่ตรงกัน"
      ],
      success: false,
      menu: "",
      rules: {
        required: value => !!value || "โปรดระบุค่า",
        min: value => value.length >= 6 || "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        emailMatch: () => "The email and password you entered don't match",
        comfirmPass: value => {
          console.log(value);
        }
      },
      hint: 1
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  head() {
    return {
      title: `สร้างบัญชีผู้ใช้ - ${conf.title_project}`
    };
  },
  mounted() {
    // document.title = `สร้างบัญชีผู้ใช้ - ${conf.title_project}`;
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    checkHintPwd() {
      if (this.password.length >= 6) {
        this.hint = 1;
      } else if (this.password.length > 0 && this.password.length < 6) {
        this.hint = 2;
      } else {
        this.hint = 1;
      }
    },
    onValidate() {
      // this.$refs.form.validate();
      // this.password = "";
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.reqGetCheckEmail();
      } else {
        this.openDialog();
      }
    },
    save(date) {
      this.$refs.menu.save(date);
      this.dateShow = this.setDateShow(date);
    },
    setDateShow(date) {
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
    onClickRegister() {
      // this.validate()
      this.reqPostSignup();
    },
    reqPostSignup() {
      const req = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        birthDate: this.date.trim(),
        gender: this.gender.trim(),
        email: this.email.trim(),
        password: this.password.trim()
        // passwordConfirm: this.passwordConfirm
      };
      console.log(req);
      apiService
        .onPostSignup(req)
        .then(res => {
          console.log(res);
          this.success = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDialog() {
      this.dialog = true;
    },
    reqGetCheckEmail() {
      apiService
        .onGetCheckEmail(this.email)
        .then(res => {
          console.log(res);
          this.onClickRegister();
        })
        .catch(err => {
          console.log(err);
          this.dialogCheckMail = true;
        });
    }
  }
};
</script>

<style scoped>
.v-menu__content {
  min-width: 1px !important;
}
.v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
  margin-top: 5px;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
  width: 25%;
}

.divider-custom1 {
  margin: 1.25rem 0 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider-custom1 .divider-custom1-line {
  width: 100%;
  max-width: 100%;
  height: 3px;
  background-color: #f2f2f2;
  border-radius: 1rem;
  border-color: #f2f2f2 !important;
}

.divider-custom1 .divider-custom1-line:first-child {
  margin-right: 0rem;
}

.divider-custom1 .divider-custom1-line:last-child {
  margin-left: 0rem;
}
.background {
  background-color: #f47932;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
}

/*---------------------------------------------*/
a {
  font-family: Anakotmai;
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #f47932;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/

.txt3 {
  font-family: Anakotmai;
  font-size: 13px;
  color: #bfbfbf;
  line-height: 1.4;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  /* min-height: 150vh; */
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #f47932;
}
/* 
.container-login100.isSuccess {
  min-height: 100vh;
} */

.wrap-login100 {
  width: 560px;
  background: #fff;
  border-radius: 10px;
  position: relative;
}

/*==================================================================
[ Form ]*/

.login100-form {
  width: 100%;
}

.login100-form-title {
  font-family: Anakotmai;
  /* font-size: 30px; */
  color: #bfbfbf;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: left;

  width: 100%;
  display: block;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.login100-form-btn {
  font-family: Anakotmai;
  font-size: 16px !important;
  color: #fff;
  line-height: 1.2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  min-width: 150px;
  height: 55px !important;
  background-color: #f47932 !important;
  border-radius: 27px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background-color: #f47932;
}

.p-t-55 {
  padding-top: 55px;
}

.p-b-10 {
  padding-bottom: 10px;
}

.p-b-32 {
  padding-bottom: 32px;
}

.p-b-55 {
  padding-bottom: 55px;
}

.p-l-85 {
  padding-left: 85px;
}

.p-r-85 {
  padding-right: 85px;
}

.main-container-4 {
  padding: 50px 0 !important;
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

.hint {
  position: absolute;
  font-size: 12px;
  color: #666666;
  bottom: 7px;
  left: 12px;
}
.hint-red {
  position: absolute;
  font-size: 12px;
  color: #ff5252;
  bottom: 7px;
  left: 12px;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

/*//////////////////////////////////////////////////////////////////
[ Responsive ]*/

@media (max-width: 576px) {
  .wrap-login100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media screen and (max-width: 767px) {
  .p-l-85 {
    padding-left: 20px;
  }

  .p-r-85 {
    padding-right: 20px;
  }

  .wrap-login100 {
    width: auto;
  }
}
</style>
