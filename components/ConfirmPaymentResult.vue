<template>
  <div class="main-container-4">
    <v-card class="mx-auto" max-width="1360" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="col-12">
            <h2 class="title-text text-center" style="color:#6DD400;">
              <i class="fa fa-check-circle-o" aria-hidden="true" style="font-size:60px"></i> ขอบคุณสำหรับการบริจาค
            </h2>
            <div v-if="data1&&data2" class="col-12">
              <div class="form-inline col-12">
                <label class="col-6 text-right base-txt-16 color-grey">หมายเลขในการบริจาค</label>
                <div class="col-6" style="display:inline;">
                  <label class="base-txt-16 color-grey2">{{data1._id}}</label>
                </div>
              </div>

              <div class="form-inline col-12">
                <label class="col-6 text-right base-txt-16 color-grey">ชื่อ-นามสกุลผู้บริจาค</label>
                <div class="col-6" style="display:inline;">
                  <label
                    class="col-5 base-txt-16 color-grey2"
                  >{{data1.donatorId.firstName}} {{data1.donatorId.lastName}}</label>
                </div>
              </div>

              <div class="form-inline col-12">
                <label class="col-6 text-right base-txt-16 color-grey">เบอร์โทรศัพท์</label>
                <div class="col-6" style="display:inline;">
                  <label class="col-5 base-txt-16 color-grey2">{{data1.donatorId.telephoneNumber}}</label>
                </div>
              </div>

              <div class="form-inline col-12">
                <label class="col-6 text-right base-txt-16 color-grey">ยอดชำระทั้งหมด</label>
                <div class="col-6" style="display:inline;">
                  <label
                    class="col-5 base-txt-16 color-grey2"
                  >{{data2.amount | formatPriceDecimal}} บาท</label>
                </div>
              </div>

              <div class="form-inline col-12">
                <label class="col-6 text-right base-txt-16 color-grey">วันที่โอน</label>
                <div class="col-6" style="display:inline;">
                  <label
                    class="col-5 base-txt-16 color-grey2"
                  >{{data2.date | formatDate}} {{data2.time}}</label>
                </div>
              </div>

              <div class="form-inline col-12">
                <label class="col-6 text-right base-txt-16 color-grey">โอนเข้าบัญชี</label>
                <div class="col-6" style="display:inline;">
                  <label class="col-5 base-txt-16 color-grey2">{{data2.bank.bankName}}</label>
                </div>
              </div>

              <div class="form-inline col-12">
                <label class="col-6 col-sm-6 text-right base-txt-16 color-grey">หลักฐานการโอน</label>
                <div class="col-6 col-sm-ค" style="display:inline;">
                  <button
                    @click.stop="dialog = true"
                    class="col-12 col-sm-4 col-md-3 col-lg-2 btn-fw"
                    style="background-color:#F7B500;font-size:16px;"
                  >กดเพื่อแสดงรูปภาพ</button>
                </div>
                <v-dialog id="scroll-time-picker" v-model="dialog" max-width="500">
                  <v-card>
                    <img v-bind:src="data2.url" />
                  </v-card>
                </v-dialog>
              </div>

              <div class="form-inline col-12">
                <div class="h20"></div>
                <div
                  class="text-center base-txt-16 color-grey"
                >*การตรวจสอบหลักฐานใช้เวลา 3-5 วันทำการ*</div>
                <div class="h10"></div>
              </div>

              <div class="row col-12">
                <button @click="back()" class="col-2 btn-fw mx-auto">ปิด</button>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import util from "@/services/util";
import apiService from "@/services/api-services";
import conf from "@/config/config.json";
import manageData from "@/services/manage-data";
import moment from "moment";
// import apiService from "../../services/api-services";
export default {
  name: "ShowFormDetail",
  data() {
    return {
      data1: null,
      data2: null,
      dialog: false
    };
  },
  created() {
    // this.scrollToTop();
    // document.title = `ขอบคุณ - ${conf.title_project}`;
    // this.getData();
    // this.getHint();
  },
  mounted() {
    this.scrollToTop();
    document.title = `ขอบคุณ - ${conf.title_project}`;
    this.getData();
    this.getHint();
  },
  destroyed() {
    manageData.clearShowForm();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    back() {
      switch (this.data2.backPage) {
        case "history":
          this.$router.push("/history");
          break;
        case "paymentdropdown":
          this.$router.push("/confirm-payment");
          break;
      }
    },
    // reqDonation() {
    //   apiService
    //     .onGetDonationById(this.id)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    getData() {
      this.data1 = manageData.getShowForm1();
      this.data2 = manageData.getShowForm2();
    },
    getHint() {
      this.profile = util.getUserDetail();
      setTimeout(() => {
        this.reqGetDonationPending();
      }, 0);
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
      const formatDate = `${d}/${m}/${y}`;
      return formatDate;
    },
    formatDateTime(value) {
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
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatPriceDecimal(value) {
      if (!value) {
        return "0.00";
      }
      const num = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const a = parseFloat(value).toFixed(2);
      const b = a.split(".");
      const decimal = b[1];
      return num + "." + decimal;
    }
  }
};
</script>

<style scoped>
</style>
