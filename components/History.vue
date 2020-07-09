<template>
  <div class="main-container-4">
    <div v-if="showCpn" class="container">
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="col-12">
              <div class="row">
                <div class="col-12 col-sm-6">
                  <h3 class="title-text">ประวัติการบริจาค</h3>
                </div>
                <div class="col-12 col-sm-6 safari" id="dropdown-example">
                  <div class="pull-right">
                    <v-select
                      style="font-family:Anakotmai;"
                      @change="onChangeYear()"
                      v-model="year"
                      :items="yearOptions"
                      filled
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-12 xs">
                <div class="form-inline col-12 xs">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">ลำดับ</th>
                          <th class="text-left">ชื่อผู้บริจาค</th>
                          <th class="text-right">ยอดบริจาค</th>
                          <th class="text-center">วันที่บริจาค</th>
                          <th class="text-left">ช่องทางชำระเงิน</th>
                          <th class="text-left">สถานะ</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in donationHistory" :key="item._id">
                          <td>{{index + 1 + ((currentPageDel -1) * limit)}}</td>
                          <td>
                            <span
                              v-if="item.donatorId"
                            >{{item.donatorId.firstName}} {{item.donatorId.lastName}}</span>
                            <span v-else>-</span>
                          </td>
                          <td class="text-right">{{item.donationInfo.amount | formatPrice}}</td>
                          <td class="text-center">{{item.createdAt | formatDate}}</td>
                          <td class="text-left">{{item.donationInfo.method | methodTh}}</td>
                          <td>
                            <span v-if="item.status == 'success'">ชำระสำเร็จ</span>
                            <span v-else-if="item.status == 'pending'">รอแจ้งชำระ</span>
                            <span v-else-if="item.status == 'processing'">กำลังประมวลผล</span>
                            <span v-else-if="item.status == 'cancelled'">
                              <div class="block-status">
                                ถูกยกเลิก
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <div class="txt-tooltip">
                                      <i
                                        v-on="on"
                                        class="fa fa-exclamation-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </template>
                                  <span>เนื่องจาก : {{item.cancelledReason}}</span>
                                </v-tooltip>
                              </div>
                            </span>
                            <span v-else-if="item.status == 'rejected'">ถูกปฏิเสธ</span>
                            <span v-else-if="item.status == 'payment_failed'">ชำระเงินไม่สำเร็จ</span>
                            <span v-else-if="item.status == 'payment_pending'">อยู่ระหว่างดำเนินการ</span>
                            <span v-else>{{item.status}}</span>
                          </td>
                          <td>
                            <v-btn
                              class="buttons col-lg-12 col-md-12 col-sm-12 col-12 text-center"
                              style="width:200px;padding-right:0px;padding-left:10px;background-color:#F47932;font-family: Anakotmai;"
                              @click.stop="$set(dialogNote, item._id, true)"
                              @click="onClickSendSlip(item._id)"
                              v-bind:disabled="
                              item.status == 'success' || 
                              item.status == 'cancelled' || 
                              item.status == 'payment_failed' || 
                              item.status == 'payment_pending' || 
                              item.donationInfo.method == 'Credit or Debit Card'
                              "
                            >แนบหลักฐาน</v-btn>
                            <!-- <v-btn
                            class="buttons col-lg-12 col-md-12 col-sm-12 col-12 text-center"
                            style="width:200px;padding-right:0px;padding-left:10px;background-color:#F47932;font-family: Anakotmai;"
                            v-model="item.action"
                            @click.stop="$set(dialogNote, item._id, true)"
                            v-bind:disabled="item.action"
                            >แนบหลักฐาน</v-btn>-->
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <div class="h20"></div>
                  <div
                    v-if="donationHistory.length == 0"
                    style="text-align:center; font-size:16px; color:#666666;"
                  >ไม่พบข้อมูล</div>
                  <div v-if="donationHistory.length > 0" class="text-center">
                    <v-pagination
                      @input="changePage"
                      v-model="currentPage"
                      color="#F47932"
                      :length="pageLength"
                    ></v-pagination>
                  </div>
                  <v-dialog v-model="dialogNote[donationId]" scrollable max-width="1280">
                    <v-card>
                      <v-card-title>
                        <h3 class="title-text">แจ้งชำระเงินบริจาค</h3>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="custom-scrollbar" style="height:600px">
                        <v-form>
                          <v-container>
                            <v-row>
                              <div class="col-xs-12 col-sm-6 safari">
                                <v-text-field
                                  v-on:keyup="keyupTransferAmount"
                                  v-model="transferAmount"
                                  label="ยอดบริจาค(บาท)"
                                  outlined
                                  onkeypress="if(this.value.length==13) return false;"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(.*)/g, '$1');"
                                  class="input-send"
                                ></v-text-field>
                              </div>

                              <div class="col-xs-12 col-sm-6 safari">
                                <v-select
                                  v-model="transferBank"
                                  :items="bankAccount"
                                  item-value="_id"
                                  item-text="bankName"
                                  label="ชำระเข้าบัญชี"
                                  class="input-send"
                                  outlined
                                ></v-select>
                              </div>

                              <div class="col-xs-12 col-sm-6 safari">
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
                                      v-model="dateShow"
                                      label="วันที่โอนเงิน"
                                      readonly
                                      v-on="on"
                                      outlined
                                      class="input-send"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    ref="picker"
                                    v-model="date"
                                    locale="th-th"
                                    :max="new Date().toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save"
                                  ></v-date-picker>
                                  <!-- ข้างบนมี@change="save" -->
                                </v-menu>
                              </div>

                              <div
                                class="col-xs-12 col-sm-6 safari block-time-picker"
                                v-click-outside="hidePickerTime"
                              >
                                <!-- <v-menu
                                  ref="pickerTime"
                                  v-model="pickerTime"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="time"
                                      label="เวลาโอนเงิน"
                                      v-on="on"
                                      readonly
                                      outlined
                                      class="input-send"
                                    ></v-text-field>
                                  </template>
                                  <v-time-picker
                                    @change="saveTime"
                                    v-model="time"
                                    format="24hr"
                                    :min="timeMin"
                                    :max="timeMax"
                                  ></v-time-picker>
                                </v-menu>-->
                                <v-text-field
                                  v-model="time"
                                  @click="showPicker=true"
                                  label="เวลาโอนเงิน"
                                  readonly
                                  outlined
                                  class="input-send"
                                ></v-text-field>
                                <div v-bind:class="{'active': showPicker}" class="time-picker">
                                  <div class="box-head">
                                    <div class="current-pick">{{time}}</div>
                                  </div>
                                  <div class="box-body">
                                    <div class="hour" id="scroll-time-picker">
                                      <ul v-if="hourOptions.length > 0">
                                        <li
                                          v-for="(item,i) in hourOptions"
                                          :key="i"
                                          @click="onClickHour(item.hour, item.enable)"
                                          v-bind:class="{'active': hourActive==item.hour}"
                                        >
                                          <div>{{item.hour}}</div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div class="min" id="scroll-time-picker">
                                      <ul v-if="minOptions.length > 0">
                                        <li
                                          v-for="(item,i) in minOptions"
                                          :key="i"
                                          @click="onClickMin(item.min, item.enable)"
                                          v-bind:class="{'active': minActive==item.min}"
                                        >
                                          <div>{{item.min}}</div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </v-row>
                          </v-container>
                        </v-form>
                        <!-- <div class="form-inline row col-12">
                        <p
                          class="col-3"
                          style="font-size:20px;font-family:Anakotmai;color: #6D7278;display:inline;"
                        >
                          บัญชีธนาคารที่โอนเข้า
                          <i
                            style="color:red;width:10px !important;height:10px !important;font-size: 8px !important;"
                            class="fa fa-asterisk"
                            aria-hidden="true"
                          ></i>
                        </p>

                        <div
                          v-for="item in bankAccount"
                          :key="item._id"
                          class="col-3"
                          style="display:inline;"
                        >
                          <div class="radio">
                            <input
                              v-model="transferBank"
                              v-bind:value="item._id"
                              style="width: 50px;height: 25px;margin-top: 15px;color:#F47932;"
                              type="radio"
                              name="optradio"
                            />
                          </div>
                          <img
                            v-bind:src="item.bankIconUrl"
                            width="50px"
                            height="50px"
                            style="display:inline;"
                          />
                          <p
                            class="col-12"
                            style="font-size:18px;font-family:Anakotmai;color: #6D7278;display:inline;"
                          >{{item.bankName}}</p>
                        </div>
                        </div>-->
                        <div class="divider-custom">
                          <div class="divider-custom-line"></div>
                        </div>
                        <p class="col-12 base-txt-16 color-grey">
                          อัพโหลดหลักฐานการชำระเงินบริจาค
                          <i
                            style="color:red;width:10px !important;height:10px !important;font-size: 8px !important;"
                            class="fa fa-asterisk"
                            aria-hidden="true"
                          ></i>
                        </p>
                        <input type="file" @change="previewFiles" ref="file" style="display:none" />
                        <div @click="$refs.file.click()" class="input-upload-file">
                          <div v-if="!url" class="txt-upload base-txt-16">
                            <span>
                              <i class="fa fa-cloud-upload" style="margin-right:4px"></i>คลิกเพื่ออัพโหลด
                            </span>
                          </div>
                          <div v-else class="img-upload">
                            <img v-bind:src="url" style="max-width:100%" />
                          </div>
                        </div>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions style="margin:0 auto">
                        <v-spacer></v-spacer>
                        <v-btn
                          style="font-family:Anakotmai;color:#F47932;margin-bottom:20px;"
                          @click.stop="$set(dialogNote, donationId, false)"
                        >ยกเลิก</v-btn>
                        <v-btn
                          @click="onClickConfirmSendSlip()"
                          style="font-family:Anakotmai;color:#FFF; margin-bottom:20px;"
                          color="#F47932"
                          v-bind:disabled="!transferAmount||!transferBank||!date||!url||!time"
                        >บันทึกข้อมูล</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
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
import util from "@/services/util";
import AWS from "aws-sdk";
import manageData from "@/services/manage-data";
import ClickOutside from "vue-click-outside";
export default {
  name: "HistoryDetail",
  directives: {
    ClickOutside
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 700,
        thumbnailHeight: 1000,
        // thumbnailMethod: 'contain',
        ddRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>คลิกเพื่ออัพโหลด"
      },
      bankAccount: [],
      currentPage: 1,
      currentPageDel: 1,
      pageLength: 10,
      limit: 25,
      offset: 0,
      dialogNote: {},
      donationId: "",
      donationData: {},
      url: null,
      pickerTime: false,
      menu: "",
      date: "",
      dateShow: "",
      time: "",
      timeMin: "00:00",
      timeMax: "23:59",
      transferAmount: "",
      transferBank: "",
      profile: null,
      dialog: false,
      year: null,
      yearOptions: [],
      dateStart: "",
      dateEnd: "",
      showPicker: false,
      hourOptions: [
        // { hour: "00", enable: true },
        // { hour: "01", enable: true },
        // { hour: "02", enable: true },
        // { hour: "03", enable: true },
        // { hour: "04", enable: true },
        // { hour: "05", enable: true },
        // { hour: "06", enable: true },
        // { hour: "07", enable: true },
        // { hour: "08", enable: true },
        // { hour: "09", enable: true },
        // { hour: "10", enable: true },
        // { hour: "11", enable: true },
        // { hour: "12", enable: true },
        // { hour: "13", enable: true },
        // { hour: "14", enable: true },
        // { hour: "15", enable: true },
        // { hour: "16", enable: true },
        // { hour: "17", enable: true },
        // { hour: "18", enable: true },
        // { hour: "19", enable: true },
        // { hour: "20", enable: true },
        // { hour: "21", enable: true },
        // { hour: "22", enable: true },
        // { hour: "23", enable: true }
      ],
      minOptions: [
        // { min: "00", enable: true },
        // { min: "01", enable: true },
        // { min: "02", enable: true },
        // { min: "03", enable: true },
        // { min: "04", enable: true },
        // { min: "05", enable: true },
        // { min: "06", enable: true },
        // { min: "07", enable: true },
        // { min: "08", enable: true },
        // { min: "09", enable: true },
        // { min: "10", enable: true },
        // { min: "11", enable: true },
        // { min: "12", enable: true },
        // { min: "13", enable: true },
        // { min: "14", enable: true },
        // { min: "15", enable: true },
        // { min: "16", enable: true },
        // { min: "17", enable: true },
        // { min: "18", enable: true },
        // { min: "19", enable: true },
        // { min: "20", enable: true },
        // { min: "21", enable: true },
        // { min: "22", enable: true },
        // { min: "23", enable: true },
        // { min: "24", enable: true },
        // { min: "25", enable: true },
        // { min: "26", enable: true },
        // { min: "27", enable: true },
        // { min: "28", enable: true },
        // { min: "29", enable: true },
        // { min: "30", enable: true },
        // { min: "31", enable: true },
        // { min: "32", enable: true },
        // { min: "33", enable: true },
        // { min: "34", enable: true },
        // { min: "35", enable: true },
        // { min: "36", enable: true },
        // { min: "37", enable: true },
        // { min: "38", enable: true },
        // { min: "39", enable: true },
        // { min: "40", enable: true },
        // { min: "41", enable: true },
        // { min: "42", enable: true },
        // { min: "43", enable: true },
        // { min: "44", enable: true },
        // { min: "45", enable: true },
        // { min: "46", enable: true },
        // { min: "47", enable: true },
        // { min: "48", enable: true },
        // { min: "49", enable: true },
        // { min: "50", enable: true },
        // { min: "51", enable: true },
        // { min: "52", enable: true },
        // { min: "53", enable: true },
        // { min: "54", enable: true },
        // { min: "55", enable: true },
        // { min: "56", enable: true },
        // { min: "57", enable: true },
        // { min: "58", enable: true },
        // { min: "59", enable: true }
      ],
      hourActive: "",
      minActive: "",
      donationHistory: [],
      showCpn: false
    };
  },
  mounted() {
    this.scrollToTop();
    this.genOptionsPickerTime(24, 60);
    this.getProfile();
    document.title = `ประวัติการบริจาค - ${conf.title_project}`;
    this.currentYear();
    // this.reqGetDonation();
    this.reqGetBankAccount();
    this.limit = conf.donation.history_per_page;
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
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    save(date) {
      this.$refs.menu.save(date);
      this.dateShow = this.setDateShow(date);
      this.setTimeMinMax(date);
    },
    saveTime(time) {
      this.$refs.pickerTime.save(time);
    },

    hidePickerTime() {
      this.showPicker = false;
    },
    genOptionsPickerTime(h, m) {
      let hourOptions = [];
      let minOptions = [];
      for (let index = 0; index < h; index++) {
        let h = index.toString();
        if (h.length == 1) h = "0" + h;
        hourOptions.push({ hour: h, enable: true });
      }
      for (let index = 0; index < m; index++) {
        let m = index.toString();
        if (m.length == 1) m = "0" + m;
        minOptions.push({ min: m, enable: true });
      }
      this.hourOptions = hourOptions;
      this.minOptions = minOptions;
    },
    onClickHour(hour, enable) {
      // console.log(hour);
      if (this.hourActive == hour || !enable) return;
      this.onSetTime(hour, "hour");
      this.hourActive = hour;
      this.onCheckPickerMin();
    },
    onClickMin(min, enable) {
      // console.log(min);
      if (this.minActive == min || !enable) return;
      this.onSetTime(min, "min");
      this.minActive = min;
    },
    onSetTime(time, prop) {
      let splitTime = this.time.split(":");
      let h = splitTime[0];
      let m = splitTime[1];
      switch (prop) {
        case "hour":
          this.time = `${time}:${m}`;
          break;
        case "min":
          this.time = `${h}:${time}`;
          break;
        case "all":
          this.time = `${h}:${m}`;
          break;
      }
    },
    onCheckPickerMin() {
      let yp = this.date.slice(0, 4);
      let mp = this.date.slice(5, 7);
      let dp = this.date.slice(8, 10);
      let yn = moment().format("YYYY");
      let mn = moment().format("MM");
      let dn = moment().format("DD");
      if (yp == yn && mp == mn && dp == dn) {
        const timeNow = moment()
          .locale("th")
          .format("LT");
        let hi = Number(this.time.slice(0, 2));
        let mi = Number(this.time.slice(3, 5));
        let hn = Number(timeNow.slice(0, 2));
        let mn = Number(timeNow.slice(3, 5));
        if (hi == hn) {
          this.genOptionsPickerTime(hn + 1, mn + 1);
          if (mi > mn) {
            this.time = timeNow;
            this.minActive = mn;
          }
        } else {
          this.genOptionsPickerTime(hn + 1, 60);
        }
      }
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

    setTimeMinMax(date) {
      let yp = date.slice(0, 4);
      let mp = date.slice(5, 7);
      let dp = date.slice(8, 10);
      let yn = moment().format("YYYY");
      let mn = moment().format("MM");
      let dn = moment().format("DD");
      // if (yp == yn && mp == mn && dp == dn) {
      //   const timeNow = moment()
      //     .locale("th")
      //     .format("LT");
      //   let hi = Number(this.time.slice(0, 2));
      //   let mi = Number(this.time.slice(3, 5));
      //   let hn = Number(timeNow.slice(0, 2));
      //   let mn = Number(timeNow.slice(3, 5));
      //   if (hi > hn) this.time = timeNow;
      //   else if (hi == hn && mi > mn) this.time = timeNow;
      //   this.timeMin = "00:00";
      //   this.timeMax = timeNow;
      // } else {
      //   this.timeMin = "00:00";
      //   this.timeMax = "23:59";
      // }
      if (yp == yn && mp == mn && dp == dn) {
        const timeNow = moment()
          .locale("th")
          .format("LT");
        let hi = Number(this.time.slice(0, 2));
        let mi = Number(this.time.slice(3, 5));
        let hn = Number(timeNow.slice(0, 2));
        let mn = Number(timeNow.slice(3, 5));
        if (hi > hn) {
          this.time = timeNow;
          this.hourActive = hn.toString();
          this.minActive = mn.toString();
        } else if (hi == hn && mi > mn) {
          this.time = timeNow;
          this.hourActive = hn.toString();
          this.minActive = mn.toString();
        }
        this.genOptionsPickerTime(hn + 1, mn + 1);
      } else {
        this.genOptionsPickerTime(24, 60);
      }
    },

    keyupTransferAmount() {
      // if (this.transferAmount.length > 1 && this.transferAmount[0] == "0") {
      //   this.transferAmount = this.transferAmount.slice(1);
      // }
      // const bgi = this.transferAmount.split(",").join("");
      // this.transferAmount = bgi
      //   .toString()
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let splitAmount = this.transferAmount.split(".");
      let amount = splitAmount[0];
      let decimal = splitAmount[1];
      if (this.transferAmount.length > 1 && this.transferAmount[0] == "0") {
        this.transferAmount = this.transferAmount.slice(1);
      } else {
        const bgi = amount.split(",").join("");
        this.transferAmount = bgi
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (decimal != undefined) {
          if (decimal.length > 2) {
            decimal = decimal.slice(0, 2);
          }
          this.transferAmount = this.transferAmount + "." + decimal;
        }
      }
    },

    currentYear() {
      const nowYear = new Date().getFullYear();
      this.year = nowYear + 543;
      this.yearOptions.push(this.year);
      this.dateStart = new Date(nowYear, 0, 1).toJSON();
      this.dateEnd = new Date(nowYear, 11, 32).toJSON();
      let y = this.year;
      for (let index = 0; index < 3; index++) {
        y -= 1;
        this.yearOptions.push(y);
      }
      console.log(this.yearOptions);
    },

    onChangeYear() {
      this.dateStart = new Date(this.year - 543, 0, 1).toJSON();
      this.dateEnd = new Date(this.year - 543, 11, 32).toJSON();
      console.log(this.dateEnd);
      this.reqGetDonation();
    },

    getProfile() {
      // apiService
      //   .onGetProfile()
      //   .then(res => {
      //     console.log(res);
      //     this.profile = res.data.resultData;
      //     this.reqGetDonation();
      //     this.reqGetDonationPending();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.profile = util.getUserDetail();
      setTimeout(() => {
        this.reqGetDonation();
        this.reqGetDonationPending();
      }, 0);
    },

    changePage() {
      this.offset =
        this.currentPage == 1 ? 0 : this.limit * (this.currentPage - 1);
      // console.log(this.currentPage);
      this.scrollToTop();
      this.reqGetDonation();
    },

    reqGetBankAccount() {
      apiService
        .onGetBankAccount()
        .then(res => {
          this.bankAccount = res.data.resultData;
          console.log(this.bankAccount);
        })
        .catch(err => {
          console.log(err);
        });
    },

    reqGetDonation() {
      apiService
        .onGetDonationByDateAndStatus(
          this.limit,
          this.offset,
          this.dateStart,
          this.dateEnd,
          this.profile._id,
          "success,pending,processing,cancelled,rejected,payment_failed,payment_pending"
        )
        .then(res => {
          this.donationHistory = res.data.resultData;
          console.log(res);
          this.currentPageDel = this.currentPage;
          this.pageLength = Math.ceil(res.data.rowCount / this.limit);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setNowDateTime() {
      // date
      let d = moment().format("L");
      this.date = `${d.slice(6, 10)}-${d.slice(0, 2)}-${d.slice(3, 5)}`;
      this.dateShow = this.setDateShow(this.date);
      this.setTimeMinMax(this.date);
      // time
      let h = new Date().getHours().toString();
      if (h.length == 1) {
        h = "0" + h;
      }
      let m = new Date().getMinutes().toString();
      if (m.length == 1) {
        m = "0" + m;
      }
      this.time = h + ":" + m;
      this.hourActive = h;
      this.minActive = m;
      this.onSetTime("00", "all");
    },
    onClickSendSlip(donationId) {
      this.transferAmount = "";
      this.transferBank = "";
      this.date = "";
      this.url = "";
      this.setNowDateTime();
      this.donationId = donationId;
      const i = this.donationHistory.findIndex(d => d._id == this.donationId);
      if (i > -1) {
        this.donationData = this.donationHistory[i];
        this.transferAmount = this.donationData.donationInfo.amount.toFixed(2);
      }
      console.log(this.donationData);
    },
    onClickConfirmSendSlip() {
      const amount = this.transferAmount.split(",").join("");
      const hour = this.time.slice(0, 2);
      const min = this.time.slice(3, 5);
      const req = {
        partnerId: this.donationData.partnerId,
        donatorId: this.donationData.donatorId._id,
        projectId: this.donationData.projectId._id,
        method: "Transfer",
        dataType: "URL",
        paymentInfo: {
          amount: Number(amount),
          paymentDate: new Date(
            new Date(this.date).setHours(hour, min)
          ).toJSON(),
          bankId: this.transferBank,
          proofOfPayment: this.url,
          paymentChannel: "Transfer",
          status: "processing"
        }
      };
      // console.log(req);
      this.onCheckUserBlockBerforePost(req);
    },

    onCheckUserBlockBerforePost(status) {
      apiService
        .onGetProfile()
        .then(res => {
          console.log(res);
          // return true;
          this.reqPostPaymentHandling(status);
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/page-not-found?case=user");
          } else {
            this.reqPostPaymentHandling(status);
          }
          // return false;
        });
    },

    reqPostPaymentHandling(req) {
      console.log(req);
      apiService
        .onPostPaymentHandling(req, this.donationId)
        .then(res => {
          console.log(res);
          // const req = {
          //   partnerId: this.donationData.partnerId,
          //   userId: this.donationData.userId,
          //   donatorId: this.donationData.donatorId._id,
          //   projectId: this.donationData.projectId._id,
          //   donationInfo: {
          //     type: "Money",
          //     amount: this.donationData.donationInfo.amount,
          //     method: this.donationData.donationInfo.method
          //   },
          //   donationChannel: this.donationData.donationChannel,
          //   status: "processing"
          // };
          // this.reqPutDonation(req);
          const bank = this.bankAccount.find(f => f._id == this.transferBank);
          const data2 = {
            amount: req.paymentInfo.amount,
            bank: bank,
            date: this.date,
            time: this.time,
            url: this.url,
            backPage: "history"
          };
          manageData.setShowForm(this.donationData, data2);
          this.$router.push(
            "/confirm-payment/" + this.donationData.projectId._id + "/result"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },

    // reqPutDonation(req) {
    //   const amount = this.transferAmount.split(",").join("");
    //   console.log(req);
    //   apiService
    //     .onPutDonation(req, this.donationId)
    //     .then(res => {
    //       console.log(res);
    //       this.dialogNote = { donationId: false };
    //       const bank = this.bankAccount.find(f => f._id == this.transferBank);
    //       const data2 = {
    //         amount: amount,
    //         bank: bank,
    //         date: this.date,
    //         url: this.url,
    //         backPage: "history"
    //       };
    //       manageData.setShowForm(this.donationData, data2);
    //       this.$router.push("/showform");
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    afterUploadComplete(file) {
      const s3 = new AWS.S3({
        accessKeyId: "DL7EOQXBNXRI2T7FGPHD",
        secretAccessKey: "at24/UhN+eMAY9ZCvEH3Xs0oa6Ro0sneWB9+GGYruXA",
        endpoint: "https://sgp1.digitaloceanspaces.com",
        region: "sgp1"
      });

      const digitDate = moment().format("DDMMYY");
      const str = util.genString(6);

      const imgDecode = file;

      const key = `${conf.partnerId}/donation/image/slipUrl/${digitDate}${str}`;
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
          this.url = data.Location;
        }
      });
    },
    previewFiles(e) {
      const file = e.target.files[0];
      this.afterUploadComplete(file);
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
  },
  filters: {
    formatDate(value) {
      if (!value) return "-";
      const date = new Date(value);
      const d = moment(date).format("DD");
      const m = moment(date)
        .locale("th")
        .format("MM");
      const y = (
        Number(
          moment(date)
            .locale("th")
            .format("YYYY")
        ) + 543
      ).toString();
      let t = moment(date)
        .locale("th")
        .format("LT");
      if (t.length == 4) t = "0" + t;
      const formatDate = `${d}/${m}/${y} ${t}`;
      return formatDate;
    },
    formatPrice(value) {
      if (!value) return "-";
      // let val = (value/1).toFixed(2).replace(',', '.')
      let amount = value.toFixed(2);
      let splitAmount = amount.split(".");
      let num = splitAmount[0];
      let decimal = splitAmount[1];
      return (
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimal
      );
    },
    methodTh(value) {
      if (!value) return "-";
      switch (value) {
        case "Transfer":
          return "โอนเงิน";
        case "Credit or Debit Card":
          return "บัตรเครดิต";
        default:
          return value;
      }
    }
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.h10 {
  clear: both;
  height: 10px;
}
.h20 {
  clear: both;
  height: 20px;
}
.v-menu__content--fixed {
  min-width: 1px !important;
}
.input-upload-file {
  text-align: center;
  border-style: dashed;
  border-color: #f47932;
  background-color: #fff;
  font-family: "Anakotmai";
  letter-spacing: 0.2px;
  color: #f47932;
  transition: background-color 0.2s linear;
  height: auto;
  margin: 0px 6%;
  cursor: pointer;
  min-height: 160px;
}
.input-upload-file .txt-upload {
  padding: 6% 0;
}
.input-upload-file .img-upload {
  padding: 2%;
}
.input-upload-file .img-upload img {
  max-height: 500px;
}

.font-head-modal {
  font-family: Anakotmai;
  font-size: 36px;
  padding-top: 40px;
}
.pull-right {
  height: 56px;
}
.input-send {
  margin-bottom: -20px !important;
  font-size: 16px;
}
/* .v-application .primary--text {
    color: #666666 !important;
    caret-color: #666666 !important;
} */
.block-status {
  position: relative;
  display: inline-block;
}
.block-status .txt-tooltip {
  position: absolute;
  right: -15px;
  top: -5px;
  cursor: pointer;
  color: #f47932;
}
.col-sm-6.safari {
  max-width: 49.9%;
}
@media screen and (max-width: 767px) {
  .font-head-modal {
    font-size: 28px;
  }
  .v-input {
    margin-top: -20px !important;
  }
  .input-upload-file .txt-upload {
    padding: 25% 0;
  }
  .col-sm-6.safari {
    max-width: inherit;
  }
}
@media (min-width: 768px) {
  .input-upload-file .txt-upload {
    padding: 11% 0;
  }
}
@media (min-width: 992px) {
  .input-upload-file .txt-upload {
    padding: 8% 0;
  }
}
@media (min-width: 1200px) {
  .input-upload-file .txt-upload {
    padding: 6% 0;
  }
}
</style>
