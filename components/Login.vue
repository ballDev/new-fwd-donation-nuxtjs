<template>
  <div>
    <div class="container-login100">
      <div class="main-container-4">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <div class="login100-form validate-form flex-sb flex-w">
            <h3 class="login100-form-title p-b-32 text-center">เข้าสู่ระบบ</h3>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="email"
                      label="ชื่อผู้ใช้"
                      :rules="emailRules"
                      outlined
                      style="border-radius:50px"
                      v-on:keyup.enter="onEnter"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="pass"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show3 ? 'text' : 'password'"
                      name="input-10-2"
                      label="รหัสผ่าน"
                      class="input-group--focused"
                      style="border-radius:50px"
                      v-on:keyup.enter="onEnter"
                      outlined
                      @click:append="show3 = !show3"
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
                  <div
                    class="text-center base-txt-16 color-grey"
                  >ชื่อผู้ใช้หรือรหัสผ่านผิดโปรดลองอีกครั้ง</div>
                  <div class="h10"></div>
                  <div class="text-center">
                    <div @click="dialog = false" class="btn-modal">ปิด</div>
                  </div>
                </div>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog403" max-width="400">
              <v-card>
                <div class="block-modal">
                  <div class="text-center base-txt-18 color-red">พบข้อผิดพลาด</div>
                  <div class="h10"></div>
                  <div
                    class="text-center base-txt-16 color-grey"
                  >ชื่อผู้ใช้ของคุณไม่สามารถใช้งานได้ขณะนี้</div>
                  <div class="h10"></div>
                  <div class="text-center">
                    <div @click="dialog403 = false" class="btn-modal">ปิด</div>
                  </div>
                </div>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogElse" max-width="400">
              <v-card>
                <div class="block-modal">
                  <div class="text-center base-txt-18 color-red">พบข้อผิดพลาด</div>
                  <div class="h10"></div>
                  <div class="text-center base-txt-16 color-grey">กรุณาลองใหม่อีกครั้ง</div>
                  <div class="h10"></div>
                  <div class="text-center">
                    <div @click="dialogElse = false" class="btn-modal">ปิด</div>
                  </div>
                </div>
              </v-card>
            </v-dialog>
            <!-- <div
              v-if="errMsg"
              style="color:red;font-size:12px;margin-bottom:5px;margin-top:-10px;text-align: center;"
            >{{errMsg}}</div>
            <div
              v-else
              style="color:red;font-size:12px;margin-bottom:5px;margin-top:-10px;text-align: center;opacity:0"
            >.</div>-->
            <div class="container-login100-form-btn">
              <v-btn
                @click="submit"
                class="login100-form-btn mx-auto col-12 base-txt-16"
              >เข้าสู่ระบบ</v-btn>
            </div>
            <div class="row hidden">
              <a
                href="#"
                class="txt3 mx-auto mt-3"
                style="font-size:16px;color: #BFBFBF !important;"
              >ลืมรหัสผ่าน?</a>
            </div>

            <div class="divider-custom1">
              <div class="divider-custom1-line"></div>
            </div>
            <span class="login100-form-title p-b-10 text-center base-txt-16">หรือ เข้าสู่ระบบด้วย</span>
            <div class="container-login100-form-btn">
              <button
                @click="logInWithFacebook()"
                class="login100-form-btn mx-auto col-12 base-txt-16"
                style="background-color: #F2F2F2  !important;color: #BFBFBF;"
              >
                <img src="../assets/images/fb.png" class="icon-social" /> เข้าสู่ระบบด้วย Facebook
              </button>
            </div>
            <div class="container-login100-form-btn mt-3">
              <button
                @click="handleClickSignIn"
                class="login100-form-btn mx-auto col-12"
                style="background-color: #F2F2F2 !important;color: #BFBFBF;"
              >
                <img src="../assets/images/gg.png" class="icon-social" /> เข้าสู่ระบบด้วย Google
              </button>
            </div>
            <!-- <div ref="google" class="g-signin2" :onSuccess="onSignIn"></div> -->
            <div class="divider-custom1">
              <div class="divider-custom1-line"></div>
            </div>
            <div class="row">
              <router-link to="/register" class="txt3 mx-auto mt-3 mar-auto">
                <h4 class="title-text">สมัครสมาชิกใหม่</h4>
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
import util from "@/services/util";
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      dialog: false,
      dialog403: false,
      dialogElse: false,
      valid: true,
      lazy: true,
      password: "Password",
      email: "",
      pass: "",
      errMsg: "",
      emailRules: [
        v => !!v || "โปรดระบุค่า",
        v => /.+@.+\..+/.test(v) || "รูปแบบอีเมลไม่ถูกต้อง"
      ],
      rules: {
        required: value => !!value || "โปรดระบุค่า",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      intervalFacebookLogin: null,
      googleProfile: null,
      googleAuth: null
    };
  },
  head() {
    return {
      title: `เข้าสู่ระบบ - ${conf.title_project}`
    };
  },
  mounted() {
    // document.title = `เข้าสู่ระบบ - ${conf.title_project}`;
    if (util.getAccessToken() != null) {
      // console.log(util.getAccessToken());
      this.$router.push("/");
    }
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.onClickEmailLogin();
      }
    },
    onEnter() {
      this.submit();
    },
    openDialog() {
      this.dialog = true;
    },
    navigate() {
      // this.$router.push("/");
      location.reload();
    },
    reqGetEmailAuth(req) {
      apiService
        .onGetEmailAuth(req)
        .then(res => {
          console.log(res);
          util.setAccessToken(res.data.resultData.access_token);
          this.navigate();
        })
        .catch(err => {
          console.log(err);
          this.showDialogError(err.response.status);
        });
    },
    showDialogError(resStatus) {
      if (resStatus == 401) {
        this.dialog = true;
      } else if (resStatus == 403) {
        this.dialog403 = true;
      } else {
        this.dialogElse = true;
      }
    },
    onClickEmailLogin() {
      const req = {
        email: this.email,
        password: this.pass
      };
      this.reqGetEmailAuth(req);
    },
    async logInWithFacebook() {
      this.intervalFacebookLogin = setInterval(() => {
        this.checkFacebookLogin();
      }, 1000);
      window.FB.login(function(response) {
        if (response.authResponse) {
          console.log(response);
          // alert("You are logged in &amp; cookie set!");
          util.setFacebookToken(response.authResponse.accessToken);
        } else {
          // alert("User cancelled login or did not fully authorize.");
        }
      });
      return false;
    },
    logoutFacebook() {
      clearInterval(this.intervalFacebookLogin);
      window.FB.logout(function(response) {
        console.log(response);
      });
    },
    checkFacebookLogin() {
      const tokenFacebook = util.getFacebookToken();
      // console.log(tokenFacebook);
      if (tokenFacebook && tokenFacebook != undefined) {
        clearInterval(this.intervalFacebookLogin);
        this.reqLoginFacebook(tokenFacebook);
      }
      // window.FB.getLoginStatus(function(response) {
      //   console.log(response);
      // });
    },
    reqLoginFacebook(facebookToken) {
      apiService
        .onGetFacebookAuth(facebookToken)
        .then(res => {
          console.log(res);
          util.setAccessToken(res.data.resultData.access_token);
          this.navigate();
        })
        .catch(err => {
          console.log(err);
          util.clearFacebookToken();
          this.showDialogError(err.response.status);
        });
    },
    // onSignIn(googleUser) {
    //   var profile = googleUser.getBasicProfile();
    //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //   console.log("Name: " + profile.getName());
    //   console.log("Image URL: " + profile.getImageUrl());
    //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    // },
    handleClickSignIn() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          //on success do something
          // console.log("GoogleUser", GoogleUser);
          // console.log("getId", GoogleUser.getId());
          this.googleProfile = GoogleUser.getBasicProfile();
          this.googleAuth = GoogleUser.getAuthResponse();
          // console.log(
          //   "getAuthResponse",
          //   this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
          // );
          this.reqLoginGoogle(this.googleAuth.access_token);
        })
        .catch(error => {
          //on fail do something
          console.error(error);
        });
    },
    reqLoginGoogle(googleToken) {
      apiService
        .onGetGoogleAuth(googleToken)
        .then(res => {
          console.log(res);
          util.setAccessToken(res.data.resultData.access_token);
          this.navigate();
        })
        .catch(err => {
          console.log(err);
          this.showDialogError(err.response.status);
        });
    }
  }
};
</script>

<style scoped>
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
  /* min-height: 110vh; */
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
  font-size: 16px;
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
  /* padding: 125px 0 135px; */
  padding: 50px 0 !important;
}

.icon-social {
  width: 30px;
  height: 30px;
  margin-right: 5px;
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

.text-center {
  text-align: center !important;
}

.mt-3 {
  margin-top: 12px !important;
}

.mar-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}

.v-application .error--text {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
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
