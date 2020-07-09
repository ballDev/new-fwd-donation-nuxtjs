<template>
  <div>
    <div class="main-container-4">
      <div v-if="project" class="container">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8 mb">
            <div class="person-card">
              <div class="block-img text-center">
                <!-- <img
                  style="max-height:800px"
                  v-bind:src="imageSrc !=undefined ? imageSrc : 'http://via.placeholder.com/742x388'"
                  alt
                  class="img"
                />-->
                <v-img
                  v-bind:src="imageSrc !=undefined ? imageSrc : 'http://via.placeholder.com/742x388'"
                  aspect-ratio="1"
                  style="height:500px"
                  class="img"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <!-- <div v-if="donationList.length > 0" class="time-donate">{{hintTimeText}}</div> -->
                <div class="total-donate">
                  <div v-if="hintImg == 1" class="target">ยอดบริจาคครบตามเป้าหมาย</div>
                  <div v-else-if="hintImg == 2" class="time">สิ้นสุดระยะเวลาการบริจาค</div>
                </div>
                <!-- http://via.placeholder.com/742x388 -->
              </div>
            </div>
            <div class="col-12 block-share">
              <iframe
                :src="socialShare.src"
                width="450"
                height="35"
                style="border:none;overflow:hidden;max-height:25px;margin-top:10px"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
            <div class="person-content row col-12">
              <div class="col-12 col-sm-7">
                <div class="title-white">
                  <h3>{{projectName}}</h3>
                </div>
              </div>
              <div class="col-1 visible-xs">
                <div class="block-owner block-owner-xs">
                  <i
                    class="fa fa-user-o hidden-xs"
                    style="color: #BFBFBF; font-size: 14px;"
                    aria-hidden="true"
                  ></i>
                </div>
                <i class="fa fa-user-o" style="color: #BFBFBF; font-size: 14px;" aria-hidden="true"></i>
              </div>
              <div class="col-11 col-sm-5">
                <div class="block-owner block-owner-xs2">
                  <i
                    class="fa fa-user-o hidden-xs"
                    style="color: #BFBFBF; font-size: 14px;"
                    aria-hidden="true"
                  ></i>
                  <div class="base-txt-14 txt-owner">By {{project.projectOwner}}</div>
                </div>
              </div>
              <div class="col-12">
                <div v-for="(item, i) of projectDesc" :key="i">
                  <img v-if="item.img && item.type == 'image'" v-bind:src="item.img" />
                  <div v-else-if="item.type == 'text'" v-for="(row, iR) in item.row" :key="iR">
                    <div class="base-txt-14 color-grey">{{row.text}}</div>
                  </div>
                </div>
              </div>
            </div>
            <v-card color="basil">
              <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tabs-slider color="#F47932"></v-tabs-slider>
                <v-tab>
                  <h5>
                    <span class="base-txt-14">แผนงาน</span>
                  </h5>
                </v-tab>
                <v-tabs-slider color="#F47932"></v-tabs-slider>
                <v-tab>
                  <h5>
                    <span class="base-txt-14">ความคืบหน้า</span>
                  </h5>
                </v-tab>
                <!-- <v-tabs-slider color="#F47932"></v-tabs-slider>  
                          <v-tab style="color:#F47932;font-family: Anakotmai !important;">
                            Comment
                </v-tab>-->
              </v-tabs>

              <v-tabs-items v-model="tab" style="overflow:scroll">
                <v-tab-item>
                  <v-card color="basil" flat>
                    <v-container
                      id="scroll-target"
                      style="max-height: 400px"
                      class="overflow-y-auto"
                    >
                      <!-- <h3
                        class="title-white"
                        style="font-size: 21px;font-family: Anakotmai !important;"
                      >Title: {{projectName}}</h3>-->
                      <div class="block-plan">
                        <div v-for="(item, i) in plan" :key="i" class="base-txt-14 color-grey">
                          <img v-if="item.img && item.type == 'image'" v-bind:src="item.img" />
                          <div
                            v-else-if="item.type == 'text'"
                            v-for="(row, i) in item.row"
                            :key="i"
                          >{{row.text}}</div>
                        </div>
                      </div>
                    </v-container>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="basil" flat>
                    <v-container
                      id="scroll-target"
                      style="max-height: 400px"
                      class="overflow-y-auto"
                    >
                      <v-timeline :align-top="alignTop" :dense="dense" :reverse="reverse">
                        <v-timeline-item
                          v-for="item in event"
                          :key="item._id"
                          :fill-dot="fillDot"
                          :hide-dot="hideDot"
                          :icon="icon ? 'mdi-star' : ''"
                          :icon-color=" iconColor ? 'deep-orange' : ''"
                          :left="left"
                          :right="right"
                          :small="small"
                          color="#F47932"
                        >
                          <template v-slot:icon>
                            <v-avatar v-if="avatar">
                              <img src="http://i.pravatar.cc/64" />
                            </v-avatar>
                          </template>
                          <!-- <span slot="opposite" style="font-family: Anakotmai !important;">Tus eu perfecto</span> -->
                          <v-card class="elevation-2">
                            <v-card-title class="base-txt-14 color-black">{{item.title.th}}</v-card-title>
                            <v-card-text class="base-txt-14 color-grey">
                              <div id="desc">{{item.description.th}}</div>
                              <div class="clear-h5"></div>
                              <div id="date">
                                <b>สร้างเมื่อ</b>
                                : {{item.createdAt|formatDate}}
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-timeline-item>
                      </v-timeline>
                    </v-container>
                  </v-card>
                </v-tab-item>
                <!-- <v-tab-item>
                            <v-card
                              color="basil"
                              flat
                            >
                            <v-container
                              id="scroll-target"
                              style="max-height: 400px"
                              class="overflow-y-auto"
                            >
                            <textarea class="form-control col-12" style="background-color: #F2F2F2;box-shadow:0 0 0 .1rem rgba(151, 151, 151, 0.5)" placeholder="write your comment here..." rows="5" id="comment"></textarea>
                          <div class="col-12 text-right row" style="padding: 0px;padding-top: 5px;margin: 0px;">
                            <div class="col-6"></div>
                              <div class="col-6 text-right">
                                <button class="btn-comment text-right">Comment</button>
                              </div>
                          </div>
                          <p style="font-size: 15px;font-family: Anakotmai;">Comments (10)</p>
                          <v-card
                            class="mx-auto"
                            outlined
                          >
                          <v-list-item three-line>
                             <v-list-item-avatar
                                tile
                                size="80"
                                color="grey"
                              ></v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="headline mb-1" style="font-family: Anakotmai !important;font-size: 18px !important;">User 1<p style="font-size: 12px !important;line-height: 0px;display: inline;padding-left: 10px;font-family: Anakotmai;">02 Jun 2020 : 45 min</p></v-list-item-title>
                              <v-list-item-subtitle style="font-family: Anakotmai;">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                            </v-list-item-content>
                            </v-list-item>
                           </v-card>
                              </v-container>
                            </v-card>
                </v-tab-item>-->
              </v-tabs-items>
            </v-card>
            <!-- <div class="tab col-12">
                        <button style="color:#F47932;box-shadow:0 0 0 .2rem #F47932;font-family: Anakotmai !important;"  class="tablinks tab button col-4" v-on:click="openCity(event, 'London')">แผนงาน</button>
                        <button style="color:#F47932;font-family: Anakotmai !important;" class="tablinks tab button col-4" v-on:click="openCity(event, 'Paris')">ความคืบหน้า</button>
                        <button style="color:#F47932;box-shadow:0 0 0 .2rem #F47932;font-family: Anakotmai !important;" class="tablinks tab button col-4" v-on:click="openCity(event, 'Tokyo')">Comment</button>
                      </div>
                      <v-container
                        id="scroll-target"
                        style="max-height: 400px"
                        class="overflow-y-auto"
                      >
                      <div id="London" class="tabcontent">
                        <h3 class="title-white" style="font-size: 21px;font-family: Anakotmai !important;">Title: Lorem ipsum</h3>
                        <p style="font-size: 18px;font-family: Anakotmai !important;">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et. </p>
                      </div>
                      </v-container>
                          
                      <div id="Paris" class="tabcontent">
                     <v-container
                        id="scroll-target"
                        style="max-height: 400px"
                        class="overflow-y-auto"
                      >
                      <v-timeline
                        :align-top="alignTop"
                        :dense="dense"
                        :reverse="reverse"
                      >
                        <v-timeline-item
                          v-for="n in 5"
                          :key="n"
                          :fill-dot="fillDot"
                          :hide-dot="hideDot"
                          :icon="icon ? 'mdi-star' : ''"
                          :icon-color=" iconColor ? 'deep-orange' : ''"
                          :left="left"
                          :right="right"
                          :small="small"
                          color="#F47932"
                        >
                          <template v-slot:icon>
                            <v-avatar v-if="avatar">
                              <img src="http://i.pravatar.cc/64">
                            </v-avatar>
                          </template>
                          <span slot="opposite" style="font-family: Anakotmai !important;">Tus eu perfecto</span>
                          <v-card class="elevation-2">
                            <v-card-title class="headline" style="font-family: Anakotmai !important;">Lorem ipsum</v-card-title>
                            <v-card-text style="font-family: Anakotmai !important;">
                              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                            </v-card-text>
                          </v-card>
                        </v-timeline-item>
                      </v-timeline>
                      </v-container>
                      </div>
                        
                      <v-container
                        id="scroll-target"
                        style="max-height: 400px"
                        class="overflow-y-auto"
                      >
                      <div id="Tokyo" class="tabcontent"> 
                          <textarea class="form-control col-12" style="background-color: #F2F2F2;box-shadow:0 0 0 .1rem rgba(151, 151, 151, 0.5)" placeholder="write your comment here..." rows="5" id="comment"></textarea>
                          <div class="col-12 text-right row" style="padding: 0px;padding-top: 5px;margin: 0px;">
                            <div class="col-6"></div>
                              <div class="col-6 text-right">
                                <button class="btn-comment text-right">Comment</button>
                              </div>
                          </div>
                          <p style="font-size: 15px;font-family: Anakotmai;">Comments (10)</p>
                          <v-card
                            class="mx-auto"
                            outlined
                          >
                          <v-list-item three-line>
                             <v-list-item-avatar
                                tile
                                size="80"
                                color="grey"
                              ></v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="headline mb-1" style="font-family: Anakotmai !important;font-size: 18px !important;">User 1<p style="font-size: 12px !important;line-height: 0px;display: inline;padding-left: 10px;font-family: Anakotmai;">02 Jun 2020 : 45 min</p></v-list-item-title>
                              <v-list-item-subtitle style="font-family: Anakotmai;">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                            </v-list-item-content>
                            </v-list-item>
                           </v-card>
                      </div>
            </v-container>-->
            <div class="h20"></div>
            <gmap-map
              :center="{lat:lat, lng:lng}"
              :zoom="16"
              :options="gmapOptions"
              map-type-id="terrain"
              style="height: 300px"
              class="col-12 mt-3"
            >
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @click="infoWinOpen=true"
              ></gmap-marker>
              <gmap-info-window
                :options="infoOptions"
                :position="infoWindowPos"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen=false"
              >
                <div v-if="infoWindowPos">
                  <a
                    @click="onClickMarker()"
                    style="color:#1976d2 !important; "
                  >{{this.project.projectDetail.location.name}}</a>
                </div>
              </gmap-info-window>
            </gmap-map>
            <div class="h10"></div>
            <div
              class="block-comment fb-comments"
              :data-href="urlComment"
              data-numposts="5"
              data-width="100%"
            ></div>
          </div>
          <!-- <div class="col-lg-1 col-md-1 col-sm-1 mb"></div> -->
          <div class="col-lg-4 col-md-4 col-sm-4 mb safari">
            <div class="scale-area">
              <h6 class="base-txt-14">ได้สนับสนุนแล้ว</h6>
              <h6 style="padding-top: 13px;" class="pull-right base-txt-14">เป้าหมาย</h6>
              <v-progress-linear
                v-bind:value="calPercent(donor, target)"
                height="7"
                color="#F47932"
              ></v-progress-linear>
              <h6 class="base-txt-14">{{donor|formatPriceDecimal}} บาท</h6>
              <h6
                style="padding-top: 13px;"
                class="pull-right base-txt-14"
              >{{target|formatPriceDecimal}} บาท</h6>
            </div>
            <div class="inline-xs">
              <h6
                class="text-center text-fwb col-lg-4 col-md-4 col-sm-4 col-12 base-txt-12 color-black"
              >
                {{calPercent(donor, target)}}
                <br />ระดมทุนเเล้ว
              </h6>
            </div>
            <div class="inline-xs">
              <h6
                class="text-center text-fwb col-lg-4 col-md-4 col-sm-4 col-12 base-txt-12 color-black"
              >
                {{donatorNumber}}
                <br />ผู้บริจาค
              </h6>
            </div>
            <div class="inline-xs">
              <h6
                class="text-center text-fwb col-lg-4 col-md-4 col-sm-4 col-12 base-txt-12 color-black"
              >
                {{remain|formatDateRemain}}
                <br />เหลืออีก(วัน)
              </h6>
            </div>
            <div class>
              <div
                v-if="checkDisabledProject(startDate, endDate)"
                class="buttons col-lg-12 col-md-12 col-sm-12 col-12 text-center"
                style="padding-right:0px;padding-left:10px;"
              >
                <a
                  v-on:click.prevent="navigateToDonation(_id)"
                  class="red-btn red-btn-4"
                  style="padding: 12px 55px;margin-top: 0px;border-radius: 5px;"
                >
                  <i class="fa fa-heart" aria-hidden="true"></i> ร่วมบริจาค
                </a>
              </div>
              <div
                v-else
                class="buttons col-lg-12 col-md-12 col-sm-12 col-12 text-center"
                style="padding-right:0px;padding-left:10px;"
              >
                <a
                  class="red-btn red-btn-4 disable-btn"
                  style="padding: 12px 55px;margin-top: 0px;border-radius: 5px;"
                >
                  <i class="fa fa-heart" aria-hidden="true"></i> ร่วมบริจาค
                </a>
              </div>
            </div>
            <div class="cleaner"></div>
            <!-- <social-sharing
              :url="socialShare.url"
              :title="socialShare.title"
              :description="socialShare.description"
              :quote="socialShare.title"
              hashtags="พรรคก้าวไกล"
              inline-template
            >
              <div class="btn-share">
                <network network="facebook">
                  <div style="padding: 2px 20px">
                    <i class="fa fa-facebook" style="font-size:12px"></i> แชร์
                  </div>
                </network>
              </div>
            </social-sharing>-->
            <div v-if="donationList.length>0 && hintImg != 2" class="block-status-donate">
              <div class="col-xs-12">
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="item of donationList" :key="item._id">
                        <td class="text-left" width="60%">
                          คุณ{{item.donatorId.firstName? item.donatorId.firstName : "-"}} ...
                          <br />
                          บริจาค {{item.donationInfo.amount| formatPriceDecimal}} บาท
                        </td>
                        <td class="text-right" width="40%">{{item.processingAt | dateDonatePass}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
              <div class="h10"></div>
              <div class="text-center">
                <v-pagination
                  @input="changePage"
                  v-model="currentPage"
                  color="#F47932"
                  :length="pageLength"
                ></v-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import conf from "@/config/config.json";
import apiService from "@/services/api-services";
import utilResource from "@/services/util";
export default {
  name: "Detail",
  data() {
    return {
      alignTop: true,
      avatar: false,
      dense: true,
      fillDot: true,
      hideDot: false,
      icon: false,
      iconColor: true,
      left: false,
      reverse: false,
      right: false,
      small: true,
      tab: null,
      project: null,
      projectDesc: [],
      target: {},
      event: [],
      runningNo: [],
      imageSrc: "",
      shortDescription: "",
      projectName: "",
      lat: 0,
      lng: 0,
      percent: 0,
      remain: 0,
      donor: 0,
      donatorNumber: 0,
      startDate: "",
      endDate: "",
      plan: [],
      donationList: [],
      markers: [],
      _id: "",
      partnerId: "",
      rowCount: 0,
      hintImg: 0,
      hintTimeText: "",
      socialShare: {
        url: "",
        title: "",
        description: "",
        src: ""
      },
      urlComment: "",
      gmapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        draggable: false,
        clickableIcons: false
      },
      infoWinOpen: true,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      items: ["แผนงาน", "ความคืบหน้า", "Comment"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      currentPage: 1,
      pageLength: 10,
      limit: 10,
      offset: 0
    };
  },
  // head() {
  //   return {
  //     title: this.projectName
  //   };
  // },
  // head() {
  //   console.log("headerrrrrrrrrrrrrr =>>>>>>>>>>>");
  //   return {
  //     // title: `${this.projectName} - ${conf.title_project}`,
  //     title: `${this.info} - ${conf.title_project}`,
  //     meta: [
  //       {
  //         hid: "og:url",
  //         property: "og:url",
  //         content: `${conf.donation_fe.conn_type}${conf.donation_fe.ip}${conf.donation_fe.port}/about/${this._id}`
  //       },
  //       {
  //         hid: "og:title",
  //         name: "og:title",
  //         content: `${this.projectName} - ${conf.title_project}`
  //       },
  //       {
  //         hid: "og:description",
  //         name: "og:description",
  //         content: this.shortDescription
  //       },
  //       {
  //         hid: "og:type",
  //         name: "og:type",
  //         content: "article"
  //       },
  //       {
  //         hid: "og:image",
  //         name: "og:image",
  //         content: this.imageSrc
  //       }
  //     ]
  //   };
  // },
  mounted() {
    this.scrollToTop();
    // this._id = this.$router.currentRoute.params.id;
    // this.reqGetProjectById();
    this.reqGetProjectDescById();
    this.reqGetPlanById();
    this.reqGetEventById();
    this.reqGetDonationByProjectId();
    this.urlComment = `${conf.donation_fe.conn_type}${conf.donation_fe.ip}${conf.donation_fe.port}/about/${this._id}`;
  },
  beforeCreate() {
    this._id = this.$router.currentRoute.params.id;
  },
  created() {
    this.reqGetProjectById();
  },
  methods: {
    onClickMarker() {
      // console.log(position);
      const url = `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`;
      window.open(url);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    navigateToDonation(id) {
      // this.$router.push("/donation/" + id);
      this.$router.push("/project/" + id + "/donation");
    },
    openCity: function(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    },
    compare(a, b) {
      if (a.runningNo < b.runningNo) {
        return -1;
      }
      if (a.runningNo > b.runningNo) {
        return 1;
      }
      return 0;
    },
    addMarker() {
      const marker = {
        lat: this.lat,
        lng: this.lng
      };
      this.infoWindowPos = marker;
      this.markers.push({ position: marker });
      // console.log(this.markers);
    },
    checkDisabledProject(startDate, endDate) {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      if (now >= start && now <= end) return true;
      return false;
    },
    checkStringEnter(string) {
      let s = "";
      for (let i = 0; i < string.length; i++) {
        if (string[i] === "\n" || string[i] === "\r") {
          console.log("found enter key");
          s += "\n";
        } else {
          s += string[i];
        }
      }
      console.log(s);
    },
    calPercent(num1, num2) {
      if (num1 == undefined || num2 == undefined) {
        return "-";
      }
      let percent = (num1 / num2) * 100;
      return percent.toFixed(0) + "%";
    },
    reqGetPlanById() {
      apiService
        .onGetPlanById(this._id)
        .then(res => {
          console.log("3333", res);
          // this.plan = res.data.resultData;
          res.data.resultData.forEach(f => {
            console.log(f);
            let row = [];
            let text = "";
            for (let i = 0; i < f.th.length; i++) {
              if (f.th[i] == "\n" || f.th[i] == "\r") {
                console.log("found enter key");
                row.push({ text: text });
                text = "";
              } else if (i == f.th.length - 1) {
                text = text + f.th[i];
                row.push({ text: text });
              } else {
                text = text + f.th[i];
              }
            }
            this.plan.push({
              type: f.messageType,
              row: row,
              img: f.planImageUrl
            });
          });
          console.log("plan", this.plan);
          // const p = [
          //   {
          //     row: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }]
          //   },
          //   {
          //     row: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }]
          //   }
          // ];
        })
        .catch(err => {
          console.log(err);
        });
    },
    setSocialShare() {
      this.socialShare.url = `${conf.donation_fe.conn_type}${conf.donation_fe.ip}${conf.donation_fe.port}/about/${this._id}`;
      // setTimeout(() => {
      //   window.FB.XFBML.parse();
      // }, 0);
      // this.socialShare.url = `http://206.189.41.105:3010//about/${this._id}`;
      this.socialShare.title = `${this.projectName} - ${conf.title_project}`;
      // this.socialShare.description = "description";
      // this.socialShare.src = `https://www.facebook.com/plugins/like.php?href=${this.socialShare.url}&width=450&layout=button_count&action=like&size=small&share=true&height=35&appId=2393821564166620`;
      this.socialShare.src = `https://www.facebook.com/plugins/like.php?href=${this.socialShare.url}&width=158&layout=button_count&action=like&size=small&share=true&height=46&appId=501227754077632`;
    },
    reqGetProjectById() {
      apiService
        .onGetProjectById(this._id)
        .then(res => {
          console.log("Project", res);
          this.project = res.data.resultData;
          // this.project.isPublish = false;
          if (!res.data.resultData.isPublish) {
            this.$router.push("/page-not-found");
          }
          this.imageSrc = this.project.projectDetail.coverThumbnailUrl;
          this.shortDescription = this.project.projectDetail.shortDescription.th;
          this.projectName = this.project.projectName.th;
          // document.title = `${this.projectName} - คณะอนาคตใหม่`;
          // this.title = `${this.projectName} - คณะอนาคตใหม่`;
          this.lat = this.project.projectDetail.location.lat;
          this.lng = this.project.projectDetail.location.lng;
          this.target = this.project.projectDetail.target;
          this.percent = this.project.donationNumber;
          this.donor = this.project.donationAmount;
          this.donatorNumber = this.project.donatorNumber;
          const oneDay = 24 * 60 * 60 * 1000;
          const endDate = new Date(this.project.donateEndDate);
          const today = new Date(new Date());
          this.remain = Math.ceil((endDate - today) / oneDay);
          // let endDate = moment(this.project.donateEndDate);
          // let today = moment();
          // this.remain = endDate.diff(today, "d") + 1;
          this.startDate = this.project.donateStartDate;
          this.endDate = this.project.donateEndDate;
          this.addMarker();
          this.setSocialShare();
          this.checkShowHintImg();
        })
        .catch(err => {
          console.log(err);
        });
    },
    reqGetProjectDescById() {
      apiService
        .onGetProjectDescById(this._id)
        .then(res => {
          // console.log(res.data.resultData);
          // this.projectDesc = res.data.resultData;
          // this.projectDesc.sort(this.compare);
          res.data.resultData.forEach(f => {
            console.log(f);
            let row = [];
            let text = "";
            for (let i = 0; i < f.th.length; i++) {
              if (f.th[i] == "\n" || f.th[i] == "\r") {
                console.log("found enter key");
                row.push({ text: text });
                text = "";
              } else if (i == f.th.length - 1) {
                text = text + f.th[i];
                row.push({ text: text });
              } else {
                text = text + f.th[i];
              }
            }
            let img = "";
            f.projectImageUrl ? (img = f.projectImageUrl) : (img = "");
            this.projectDesc.push({ type: f.messageType, row: row, img: img });
          });
          console.log("Desc", this.projectDesc);
          this.setSocialShare();
        })
        .catch(err => {
          console.log(err);
        });
    },
    reqGetEventById() {
      apiService
        .onGetEventById(this._id)
        .then(res => {
          console.log("4444", res);
          this.event = res.data.resultData;
          this.rowCount = res.data.rowCount;
          console.log(this.rowCount);
          // console.log("event", this.event);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reqGetDonationByProjectId() {
      if (!utilResource.getAccessToken()) return;
      apiService
        .onGetDonationByProjectId(this._id, this.limit, this.offset)
        .then(res => {
          console.log("Donation", res);
          this.donationList = res.data.resultData;
          if (this.offset == 0) {
            this.setDateTimeHint();
          }
          this.pageLength = Math.ceil(res.data.rowCount / this.limit);
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkShowHintImg() {
      let statusTimeDonate = this.checkDisabledProject(
        this.project.donateStartDate,
        this.project.donateEndDate
      );
      let statusAmountDonate;
      this.project.donationAmount >= this.project.projectDetail.target
        ? (statusAmountDonate = true)
        : (statusAmountDonate = false);
      if (!statusTimeDonate) {
        this.hintImg = 2;
      } else if (statusTimeDonate && statusAmountDonate) {
        this.hintImg = 1;
      } else {
        this.hintImg = 0;
      }
    },
    setDateTimeHint() {
      if (this.donationList.length == 0) return;
      let nowDate = new Date().getTime();
      let donateDate = new Date(this.donationList[0].updatedAt).getTime();
      let y = Math.floor(
        (nowDate - donateDate) / 1000 / 60 / 60 / 24 / 30 / 365
      );
      let mo = Math.floor((nowDate - donateDate) / 1000 / 60 / 60 / 24 / 30.5);
      let d = Math.floor((nowDate - donateDate) / 1000 / 60 / 60 / 24);
      let h = Math.floor((nowDate - donateDate) / 1000 / 60 / 60);
      let mi = Math.floor((nowDate - donateDate) / 1000 / 60);
      let s = Math.floor((nowDate - donateDate) / 1000);
      if (y >= 1) this.hintTimeText = `ได้รับบริจาค ${y} ปีที่แล้ว`;
      else if (mo >= 1) this.hintTimeText = `ได้รับบริจาค ${mo} เดือนที่แล้ว`;
      else if (d >= 1) this.hintTimeText = `ได้รับบริจาค ${d} วันที่แล้ว`;
      else if (h >= 1) this.hintTimeText = `ได้รับบริจาค ${h} ชั่วโมงที่แล้ว`;
      else if (mi >= 1) this.hintTimeText = `ได้รับบริจาค ${mi} นาทีที่แล้ว`;
      else this.hintTimeText = `ได้รับบริจาค ${s} วินาทีที่แล้ว`;
    },
    changePage() {
      this.offset =
        this.currentPage == 1 ? 0 : this.limit * (this.currentPage - 1);

      console.log(this.currentPage);
      this.reqGetDonationByProjectId();
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
      // let t = moment(date)
      //   .locale("th")
      //   .format("LT");
      // if (t.length == 4) t = "0" + t;
      const formatDate = `${d} ${m} ${y}`;
      return formatDate;
    },
    formatPrice(value) {
      if (!value) {
        return "0";
      }
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
    },
    formatDateRemain(value) {
      if (Number(value) < 0) {
        return 0;
      } else {
        return value;
      }
    },
    dateDonatePass(value) {
      if (!value) {
        return "-";
      }
      let nowDate = new Date().getTime();
      let donateDate = new Date(value).getTime();
      let y = Math.floor(
        (nowDate - donateDate) / 1000 / 60 / 60 / 24 / 30 / 365
      );
      let mo = Math.floor((nowDate - donateDate) / 1000 / 60 / 60 / 24 / 30.5);
      let d = Math.floor((nowDate - donateDate) / 1000 / 60 / 60 / 24);
      let h = Math.floor((nowDate - donateDate) / 1000 / 60 / 60);
      let mi = Math.floor((nowDate - donateDate) / 1000 / 60);
      let s = Math.floor((nowDate - donateDate) / 1000);
      if (y >= 1) return `${y} ปีที่แล้ว`;
      else if (mo >= 1) return `${mo} เดือนที่แล้ว`;
      else if (d >= 1) return `${d} วันที่แล้ว`;
      else if (h >= 1) return `${h} ชั่วโมงที่แล้ว`;
      else if (mi >= 1) return `${mi} นาทีที่แล้ว`;
      return `${s} วินาทีที่แล้ว`;
    }
  }
};
</script>

<style scoped>
.basil--text {
  color: #f47932 !important;
}

.tab {
  overflow: hidden;
  border: 2px solid #f47932;
  border-radius: 3px;
  padding: 0px;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 10px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover,
.tab button.hover,
.tab button:focus {
  background-color: #f47932;
  color: #ffffff !important;
}

/* Create an active/current tablink class */
.tab button:active,
.tab button.active,
.tab button:focus {
  background-color: #f47932;
  color: #ffffff;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 2px solid #f47932;
  border-top: none;
}
.main-container-4 .person-img:hover {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}

.main-container-4 .person-content h3 {
  margin-top: 0;
  letter-spacing: 0;
}
.block-owner {
  text-align: right;
  margin-top: -7px;
}
.txt-owner {
  color: #bfbfbf;
  display: inline;
  padding-left: 10px;
}
.block-plan {
  margin: 20px;
}
.red-btn {
  font-size: 14px;
}

.disable-btn {
  background-color: rgba(0, 0, 0, 0.12) !important;
  color: rgba(0, 0, 0, 0.26) !important;
  cursor: inherit !important;
  user-select: none;
}
.btn-share {
  font-size: 14px;
  color: #ffffff;
  background: #1877f2;
  display: inline-block;
  /* padding: 2px 20px; */
  border-radius: 2px;
  cursor: pointer;
}
.btn-share:hover {
  opacity: 0.9;
}
.cleaner {
  clear: both;
}
.block-share {
  /* margin-top: -25px; */
  margin-bottom: -35px;
}
.col-lg-4.safari,
.col-md-4.safari {
  max-width: 33%;
}
.clear-h5 {
  clear: both;
  height: 5px;
}
.block-img {
  position: relative;
}
.block-img .time-donate {
  position: absolute;
  background: #f47932d1;
  bottom: 10px;
  right: 10px;
  color: #ffffff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 25px;
  user-select: none;
}
.block-img .total-donate {
  position: absolute;
  color: #ffffff;
  font-size: 24px;
  top: 46%;
  width: 100%;
  padding: 0 5%;
  user-select: none;
}
.block-img .total-donate .target {
  background: #f47932d1;
  padding: 4px 50px;
  width: 100%;
  transform: rotate(-30deg);
}
.block-img .total-donate .time {
  background: #cececea8;
  padding: 4px 50px;
  width: 100%;
  transform: rotate(-30deg);
}
.block-status-donate {
  border-top: solid 1px rgba(0, 0, 0, 0.12);
  margin-top: 20px;
}
.v-data-table td {
  height: 60px;
}
@media screen and (max-width: 767px) {
  .inline-xs {
    width: 33.33%;
    display: inline-block;
  }
  .block-owner-xs {
    text-align: left;
    margin-top: -25px;
    margin-bottom: -15px;
  }
  .block-owner-xs2 {
    text-align: left;
    margin-top: -15px;
    margin-bottom: -15px;
  }
  .txt-owner {
    display: inherit;
  }
  .block-plan {
    margin: 5px;
  }
  .mb {
    margin-bottom: 0px;
  }
  .col-lg-4.safari,
  .col-md-4.safari {
    max-width: inherit;
  }
  .block-img .time-donate {
    font-size: 10px;
  }
  .block-img .total-donate {
    font-size: 16px;
    padding: 0 6%;
  }
  .block-img .total-donate .target {
    transform: rotate(-25deg);
  }
  .block-img .total-donate .time {
    transform: rotate(-25deg);
  }
}
@media (min-width: 768px) {
  .block-img .time-donate {
    font-size: 12px;
    padding: 5px 10px;
  }
  .block-img .total-donate {
    font-size: 20px;
    padding: 0 5%;
  }
  .block-img .total-donate .target {
    transform: rotate(-25deg);
  }
  .block-img .total-donate .time {
    transform: rotate(-25deg);
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
  .block-img .time-donate {
    font-size: 14px;
    padding: 5px 10px;
  }
  .block-img .total-donate {
    font-size: 24px;
    padding: 0 5%;
  }
  .block-img .total-donate .target {
    transform: rotate(-30deg);
  }
  .block-img .total-donate .time {
    transform: rotate(-30deg);
  }
}
</style>
