<template>
  <div>
    <div class="main-container-4">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <h2 class="title-text text-left">โครงการ</h2>
            <div class="text-right">
              <!-- <a
                v-on:click.prevent="navigateToDonationParty(mockId)"
                class="red-btn red-btn-4"
                style="padding: 12px 55px;margin-top: 0px;border-radius: 5px;"
              >บริจาคให้พรรค</a>-->
            </div>
          </div>
        </div>
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
        </div>

        <div v-if="category.length>0" class="row">
          <div class="row col-md-12 col-sm-12 col-12 center-xs">
            <!-- <button
              v-on:click="onClickCategory('All')"
              v-on:mouseover="onHoverCategory('All')"
              v-on:mouseout="onHoverCategory('')"
              class="btn-sort-fix"
              v-bind:class="{'active': categoryActive=='All' }"
            >
              <div class="img-sort5">
                <img
                  v-if="categoryActive == 'All' || categoryHover == 'All'"
                  src="../assets/images/icon button FW/Home/Donation-1W.png"
                />
                <img v-else src="../assets/images/icon button FW/Home/Donation-1.png" />
              </div>
              <div class="text-control">ทั้งหมด</div>
            </button>

            <button
              v-on:click="onClickCategory('Popular')"
              v-on:mouseover="onHoverCategory('Popular')"
              v-on:mouseout="onHoverCategory('')"
              class="btn-sort-fix"
              v-bind:class="{'active': categoryActive=='Popular' }"
            >
              <div class="img-sort5">
                <img
                  v-if="categoryActive == 'Popular'|| categoryHover == 'Popular'"
                  src="../assets/images/icon button FW/Home/Star-2W.png"
                />
                <img v-else src="../assets/images/icon button FW/Home/Star-2.png" />
              </div>
              <div class="text-control">Popular</div>
            </button>

            <button
                v-on:click="onClickCategory(item._id)"
                v-on:mouseover="onHoverCategory(item._id)"
                v-on:mouseout="onHoverCategory('')"
                v-for="item in category"
                :key="item._id"
                class="btn-sort5"
                v-bind:class="{'active': item._id == categoryActive}"
              >
                <div class="img-sort5">
                  <img
                    v-if="item._id == categoryActive || item._id ==categoryHover"
                    v-bind:src="item.iconActiveUrl"
                  />
                  <img v-else v-bind:src="item.iconInactiveUrl" />
                </div>
                <div class="text-control">
                  {{item.categoryName.th}}
                  <span v-if="item.categoryName.th == ''" class="windwalk">.</span>
                </div>
            </button>-->
            <div class="block-btn-cate-fix hidden-xs">
              <button
                v-on:click="onClickCategory('All')"
                v-on:mouseover="onHoverCategory('All')"
                v-on:mouseout="onHoverCategory('')"
                class="btn-sort-fix"
                v-bind:class="{'active': categoryActive=='All' }"
              >
                <div class="img-sort5">
                  <img
                    v-if="categoryActive == 'All' || categoryHover == 'All'"
                    src="../assets/images/icon button FW/Home/Donation-1W.png"
                  />
                  <img v-else src="../assets/images/icon button FW/Home/Donation-1.png" />
                </div>
                <div class="text-control">ทั้งหมด</div>
              </button>

              <button
                v-on:click="onClickCategory('Popular')"
                v-on:mouseover="onHoverCategory('Popular')"
                v-on:mouseout="onHoverCategory('')"
                class="btn-sort-fix"
                v-bind:class="{'active': categoryActive=='Popular' }"
              >
                <div class="img-sort5">
                  <img
                    v-if="categoryActive == 'Popular'|| categoryHover == 'Popular'"
                    src="../assets/images/icon button FW/Home/Star-2W.png"
                  />
                  <img v-else src="../assets/images/icon button FW/Home/Star-2.png" />
                </div>
                <div class="text-control">Popular</div>
              </button>
            </div>

            <div class="block-btn-cate hidden-xs">
              <div @click="prevCarousel()" class="arrow-prev">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
              </div>
              <div @click="nextCarousel()" class="arrow">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
              <VueSlickCarousel v-bind="settings" ref="carousel" v-if="category.length>0">
                <div v-for="item in category" :key="item._id">
                  <button
                    v-on:click="onClickCategory(item._id)"
                    v-on:mouseover="onHoverCategory(item._id)"
                    v-on:mouseout="onHoverCategory('')"
                    class="btn-sort5"
                    v-bind:class="{'active': item._id == categoryActive}"
                  >
                    <div class="img-sort5">
                      <img
                        v-if="item._id == categoryActive || item._id ==categoryHover"
                        v-bind:src="item.iconActiveUrl"
                      />
                      <img v-else v-bind:src="item.iconInactiveUrl" />
                    </div>
                    <div class="text-control">
                      {{item.categoryName.th}}
                      <span
                        v-if="item.categoryName.th == ''"
                        class="windwalk"
                      >.</span>
                    </div>
                  </button>
                </div>
              </VueSlickCarousel>
            </div>

            <!-- start-xs -->
            <div class="visible-xs block-cate-xs">
              <button
                v-on:click="onClickCategory('All')"
                v-on:mouseover="onHoverCategory('All')"
                v-on:mouseout="onHoverCategory('')"
                class="btn-sort5"
                style="margin-bottom:10px"
                v-bind:class="{'active': categoryActive=='All' }"
              >
                <div class="img-sort5">
                  <img
                    v-if="categoryActive == 'All' || categoryHover == 'All'"
                    src="../assets/images/icon button FW/Home/Donation-1W.png"
                  />
                  <img v-else src="../assets/images/icon button FW/Home/Donation-1.png" />
                </div>
                <div class="text-control">ทั้งหมด</div>
              </button>

              <div class="cleaner-xs"></div>

              <button
                v-on:click="onClickCategory('Popular')"
                v-on:mouseover="onHoverCategory('Popular')"
                v-on:mouseout="onHoverCategory('')"
                class="btn-sort5"
                v-bind:class="{'active': categoryActive=='Popular' }"
              >
                <div class="img-sort5">
                  <img
                    v-if="categoryActive == 'Popular'|| categoryHover == 'Popular'"
                    src="../assets/images/icon button FW/Home/Star-2W.png"
                  />
                  <img v-else src="../assets/images/icon button FW/Home/Star-2.png" />
                </div>
                <div class="text-control">Popular</div>
              </button>
            </div>

            <div class="block-btn-cate center-xs visible-xs">
              <div @click="nextCarouselXS()" class="arrow">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
              <VueSlickCarousel v-bind="settings2" ref="carouselXS" v-if="category.length>0">
                <div v-for="item in category" :key="item._id">
                  <button
                    v-on:click="onClickCategory(item._id)"
                    v-on:mouseover="onHoverCategory(item._id)"
                    v-on:mouseout="onHoverCategory('')"
                    class="btn-sort5 visible-xs"
                    v-bind:class="{'active': item._id == categoryActive}"
                  >
                    <div class="img-sort5">
                      <img
                        v-if="item._id == categoryActive || item._id ==categoryHover"
                        v-bind:src="item.iconActiveUrl"
                      />
                      <img v-else v-bind:src="item.iconInactiveUrl" />
                    </div>
                    <div class="text-control">
                      {{item.categoryName.th}}
                      <span
                        v-if="item.categoryName.th == ''"
                        class="windwalk"
                      >.</span>
                    </div>
                  </button>
                </div>
              </VueSlickCarousel>
            </div>

            <!-- End XS -->
          </div>
        </div>
        <div v-if="project" class="row">
          <div
            v-for="(item, index) in project"
            :key="item.id"
            class="col-lg-4 col-md-4 col-sm-6 mb"
            v-bind:class="{'safari': (index+1)%3 == 0}"
          >
            <div class="bd-block-project col-xs-12">
              <div class="person-card un-project-img">
                <div class="person-img">
                  <NuxtLink :to="{ name: 'project-id', params: { id: item._id } }" class="img-link">
                    <span>
                      <i class="icon-eye" aria-hidden="true"></i>
                    </span>

                    <v-img
                      v-bind:src="item.projectDetail.coverThumbnailUrl !=undefined ? item.projectDetail.coverThumbnailUrl : 'http://via.placeholder.com/570x300'"
                      aspect-ratio="1"
                      style="width:auto; height:300px"
                      class="img"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <!-- <img
                      v-if="item.projectDetail"
                      style="width:auto; height:300px"
                      v-bind:src="item.projectDetail.coverThumbnailUrl !=undefined ? item.projectDetail.coverThumbnailUrl : 'http://via.placeholder.com/570x300'"
                      alt
                      class="img"
                    />
                    <img
                      v-else
                      style="height:200px;min-height:300px"
                      src="http://via.placeholder.com/570x300"
                      alt
                      class="img"
                    />-->
                  </NuxtLink>
                  <div
                    v-if="item.latestDonation && 
                    item.latestDonation.status == 'processing' && 
                    checkHintImg(item.donateStartDate, item.donateEndDate, item.donationAmount, item.projectDetail.target) != 2"
                    class="time-donate"
                  >{{item.latestDonation.processingAt | pipeHintTime}}</div>
                  <div class="total-donate">
                    <div
                      v-if="checkHintImg(item.donateStartDate, item.donateEndDate, item.donationAmount, item.projectDetail.target) == 1"
                      class="target"
                    >ยอดบริจาคครบตามเป้าหมาย</div>
                    <div
                      v-else-if="checkHintImg(item.donateStartDate, item.donateEndDate, item.donationAmount, item.projectDetail.target) == 2"
                      class="time"
                    >สิ้นสุดระยะเวลาการบริจาค</div>
                  </div>
                </div>

                <!-- <div class="block-img">
                <a v-on:click.prevent="navigateToDetail(item._id,item.projectName.th)">
                  <span>
                    <i class="icon-eye" aria-hidden="true"></i>
                  </span>
                  <img
                    v-if="item.projectDetail"
                    v-bind:src="item.projectDetail.coverThumbnailUrl !=undefined ? item.projectDetail.coverThumbnailUrl : 'http://via.placeholder.com/570x300'"
                    alt
                    class="img"
                  />
                  <img
                    v-else
                    src="http://via.placeholder.com/570x300"
                    alt
                    class="img"
                  />
                </a>
                </div>-->
              </div>

              <div class="pad-block-project">
                <div class="person-content">
                  <h3>
                    <a
                      v-on:click.prevent="navigateToDetail(item._id,item.projectName.th)"
                      class="title-white"
                    >{{item.projectName.th}}</a>
                  </h3>
                  <!-- <v-tooltip v-else bottom>
                    <template v-slot:activator="{ on }">
                      <h3 v-line-clamp:20="2" dark v-on="on" style="color:#f47932">
                        <a
                          v-on:click.prevent="navigateToDetail(item._id,item.projectName.th)"
                          class="title-white"
                        >{{item.projectName.th}}</a>
                      </h3>
                    </template>
                    <div class="control-tooltip">{{item.projectName.th}}</div>
                  </v-tooltip>-->
                  <!-- <p>{{item.projectDetail != undefined? item.projectDetail.shortDescription.th: '-'}}</p> -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <p
                        dark
                        v-on="on"
                        style="word-break: inherit !important; cursor: help"
                      >{{item.projectDetail != undefined && item.projectDetail.shortDescription ? item.projectDetail.shortDescription.th: '-'}}</p>
                    </template>
                    <div
                      class="control-tooltip"
                    >{{item.projectDetail != undefined && item.projectDetail.shortDescription? item.projectDetail.shortDescription.th: '-'}}</div>
                  </v-tooltip>
                </div>

                <div class="scale-area">
                  <h6 class="text-fw">ได้สนับสนุนแล้ว</h6>
                  <h6 style="padding-top: 13px;" class="pull-right text-fw">เป้าหมาย</h6>
                  <v-progress-linear
                    v-bind:value="calPercent(item.donationAmount, item.projectDetail.target)"
                    height="7"
                    color="#F47932"
                  ></v-progress-linear>
                  <h6 class="text-fw">{{item.donationAmount|formatPriceDecimal}} บาท</h6>
                  <h6
                    v-if="item.projectDetail"
                    style="padding-top: 13px;"
                    class="pull-right text-fw"
                  >{{item.projectDetail.target | formatPriceDecimal}} บาท</h6>
                </div>
                <!-- <div class="inline-xs1">
                <h6
                  class="text-center text-fwb col-lg-3 col-md-3 col-sm-3 col-xs-12"
                  style="padding-right:10px;padding-left:10px;"
                >
                  {{calPercent(item.donationAmount, item.projectDetail.target)}}
                  <br />ระดมทุนเเล้ว
                </h6>
              </div>
              <div class="inline-xs1">
                <h6
                  class="text-center text-fwb col-lg-2 col-md-2 col-sm-2 col-xs-12"
                  style="padding-right:4px;padding-left:4px;"
                >
                  {{item.donatorNumber}}
                  <br />ผู้บริจาค
                </h6>
              </div>
              <div class="inline-xs2">
                <h6
                  class="text-center text-fwb col-lg-3 col-md-3 col-sm-3 col-xs-12"
                  style="padding-right:0px;padding-left:0px;"
                >
                  {{item.remain | formatDateRemain}}
                  <br />เหลืออีก(วัน)
                </h6>
              </div>
              <div class="inline-xs3">
                <div
                  v-if="checkDisabledProject(item.donateStartDate, item.donateEndDate)"
                  class="buttons col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right"
                  style="padding-right:0px;padding-left:10px;"
                >
                  <a v-on:click.prevent="navigateToDonation(item._id)" class="red-btn red-btn-4">
                    <i class="fa fa-heart" aria-hidden="true"></i> ร่วมบริจาค
                  </a>
                </div>
                <div
                  v-else
                  class="buttons col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right"
                  style="padding-right:0px;padding-left:10px;"
                >
                  <a class="red-btn red-btn-4 disable-btn">
                    <i class="fa fa-heart" aria-hidden="true"></i> ร่วมบริจาค
                  </a>
                </div>
                </div>-->
                <h6
                  class="text-center text-fwb col-lg-3 col-md-3 col-sm-3 col-xs-3 un-card"
                  style="padding-right:10px;padding-left:10px;"
                >
                  {{calPercent(item.donationAmount, item.projectDetail.target)}}
                  <br />ระดมทุนเเล้ว
                </h6>
                <h6
                  class="text-center text-fwb col-lg-2 col-md-2 col-sm-2 col-xs-2 un-card"
                  style="padding-right:4px;padding-left:4px;"
                >
                  {{item.donatorNumber}}
                  <br />ผู้บริจาค
                </h6>
                <h6
                  class="text-center text-fwb col-lg-3 col-md-3 col-sm-3 col-xs-3 un-card"
                  style="padding-right:0px;padding-left:0px;"
                >
                  {{item.remain | formatDateRemain}}
                  <br />เหลืออีก(วัน)
                </h6>
                <div
                  v-if="checkDisabledProject(item.donateStartDate, item.donateEndDate)"
                  class="buttons col-lg-4 col-md-4 col-sm-4 col-xs-4 un-card text-right"
                  style="padding-right:0px;padding-left:10px;"
                >
                  <a v-on:click.prevent="navigateToDonation(item._id)" class="red-btn red-btn-4">
                    <i class="fa fa-heart" aria-hidden="true"></i> ร่วมบริจาค
                  </a>
                </div>
                <div
                  v-else
                  class="buttons col-lg-4 col-md-4 col-sm-4 col-xs-4 un-card text-right"
                  style="padding-right:0px;padding-left:10px;"
                >
                  <a class="red-btn red-btn-4 disable-btn">
                    <i class="fa fa-heart" aria-hidden="true"></i> ร่วมบริจาค
                  </a>
                </div>
              </div>
              <!-- </template> -->
            </div>
          </div>
          <div
            v-if="project.length == 0"
            style="text-align:center; color:#666666; width:100%; padding:60px 0;"
          >
            <h3>ไม่มีโครงการในหมวดนี้</h3>
          </div>
        </div>
        <div v-if="isButton == 1 && rowCount>3" class="text-center">
          <button v-on:click="plus()" class="btn-fw base-txt-16 color-white">ดูทั้งหมด</button>
        </div>
        <!-- <div style="background-color:red !important" >
                <sliding-pagination :current="currentPage" :total="totalPages" @page-change="pageChangeHandler" ></sliding-pagination>
        </div>-->
        <div v-if="rowCount>0" v-bind:style="{'display': displayPaging}" class="text-center">
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
</template>

<script>
// import moment from "moment";
import conf from "@/config/config.json";
import apiService from "@/services/api-services";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "Project",
  components: { VueSlickCarousel },
  data() {
    return {
      project: null,
      category: [],
      categoryActive: "All",
      categoryHover: "",
      remain: 0,
      isButton: 1,
      limit: 0,
      offset: 0,
      currentPage: 1,
      pageLength: 1,
      rowCount: 0,
      displayPaging: "none",
      projectType: "Project",
      mockId: "",
      // totalPages: 1
      settings: {
        dots: false,
        arrows: false,
        focusOnSelect: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              variableWidth: true,
              adaptiveHeight: false
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: false,
              adaptiveHeight: false
            }
          }
        ]
      },
      settings2: {
        dots: false,
        arrows: false,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      hintImg: 1,
      hintTimeText: ""
    };
  },
  head() {
    return {
      title: `โครงการบริจาค - ${conf.title_project}`
    };
  },
  created() {
    // console.log(process.env)
    this.mockId = conf.party_project_id;
    this.limit = 3;
    this.offset = 0;
    this.reqGetProjectAll();
    this.reqGetCategorys();
  },
  mounted() {
    this.scrollToTop();
    // document.title = `โครงการบริจาค - ${conf.title_project}`;
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    navigateToDetail(id, name) {
      console.log(name);
      this.$router.push("/project/" + id);
      // this.$router.push("/project/" + id + "/" + name);
    },
    navigateToDonationParty(id) {
      // this.$router.push("/donation/" + id);
      this.$router.push("/project/" + id + "/donation");
    },
    navigateToDonation(id) {
      // this.$router.push("/donation/" + id);
      this.$router.push("/project/" + id + "/donation");
    },
    plus() {
      this.limit = conf.project.contentPerPage;
      this.offset = 0;
      switch (this.categoryActive) {
        case "All":
          this.reqGetProjectAll();
          break;
        case "Popular":
          this.reqGetProjectPopular();
          break;
        default:
          this.reqGetProjectByCategory();
          break;
      }
      setTimeout(() => {
        this.displayPaging = "block";
      }, 500);
      // apiService.onGetProjectAll(this.limit, this.offset).then((res, err) => {
      //   if (res) {
      //     console.log(res);
      //     this.displayPaging = "block";
      //     this.project = res.data.resultData;
      //     for (let item of this.project) {
      //       let endDate = moment(item.donateEndDate);
      //       let today = moment();
      //       item["remain"] = endDate.diff(today, "d") + 1;
      //     }
      //     this.rowCount = res.data.rowCount;
      //     this.pageLength = Math.ceil(
      //       Number(this.rowCount / conf.project.contentPerPage)
      //     );
      //   } else console.log(err);
      // });
      this.isButton = 0;
    },
    changePage(page) {
      this.currentPage = page;
      this.limit = conf.project.contentPerPage;
      this.offset =
        this.currentPage == 1
          ? 0
          : conf.project.contentPerPage * (this.currentPage - 1);
      this.scrollToTop();
      switch (this.categoryActive) {
        case "All":
          this.reqGetProjectAll();
          // apiService
          //   .onGetProjectAll(this.limit, this.offset)
          //   .then((res, err) => {
          //     if (res) {
          //       this.project = res.data.resultData;
          //       for (let item of this.project) {
          //         let endDate = moment(item.donateEndDate);
          //         let today = moment();
          //         item["remain"] = endDate.diff(today, "d") + 1;
          //       }
          //     } else console.log(err);
          //   });
          break;
        case "Popular":
          this.reqGetProjectPopular();
          break;
        default:
          this.reqGetProjectByCategory();
          break;
      }
    },
    onClickCategory(categoryId) {
      if (this.categoryActive == categoryId) {
        return;
      }
      this.currentPage = 1;
      this.offset = 0;
      this.categoryActive = categoryId;
      switch (categoryId) {
        case "All":
          this.reqGetProjectAll();
          break;
        case "Popular":
          this.reqGetProjectPopular();
          break;
        default:
          this.reqGetProjectByCategory();
          break;
      }
    },
    onHoverCategory(categoryId) {
      this.categoryHover = categoryId;
    },
    reqGetProjectAll() {
      const now = new Date();
      const nowHundred = new Date(now.setFullYear(now.getFullYear() + 100));
      const publishStartDate = new Date().toJSON();
      const publishEndDate = nowHundred.toJSON();
      apiService
        .onGetProjectAll(
          this.limit,
          this.offset,
          publishStartDate,
          publishEndDate
        )
        .then(res => {
          console.log(res);
          this.project = res.data.resultData;
          this.rowCount = res.data.rowCount;
          for (let item of this.project) {
            // let endDate = moment(item.donateEndDate);
            // let today = moment();
            // item["remain"] = endDate.diff(today, "d") + 1;
            let oneDay = 24 * 60 * 60 * 1000;
            let endDate = new Date(item.donateEndDate);
            let today = new Date(new Date());
            item["remain"] = Math.ceil((endDate - today) / oneDay);
          }
          this.rowCount = res.data.rowCount;
          this.pageLength = Math.ceil(
            Number(this.rowCount / conf.project.contentPerPage)
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    reqGetProjectPopular() {
      // const now = new Date();
      // const nowHundred = new Date(now.setFullYear(now.getFullYear() + 100));
      // const publishStartDate = new Date().toJSON();
      // const publishEndDate = nowHundred.toJSON();
      apiService
        .onGetProjectPopular(this.limit, this.offset)
        .then(res => {
          console.log(res);
          this.project = res.data.resultData;
          this.rowCount = res.data.rowCount;
          for (let item of this.project) {
            // let endDate = moment(item.donateEndDate);
            // let today = moment();
            // item["remain"] = endDate.diff(today, "d") + 1;
            let oneDay = 24 * 60 * 60 * 1000;
            let endDate = new Date(item.donateEndDate);
            let today = new Date(new Date());
            item["remain"] = Math.ceil((endDate - today) / oneDay);
          }
          this.rowCount = res.data.rowCount;
          this.pageLength = Math.ceil(
            Number(this.rowCount / conf.project.contentPerPage)
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    reqGetProjectByCategory() {
      const now = new Date();
      const nowHundred = new Date(now.setFullYear(now.getFullYear() + 100));
      const publishStartDate = new Date().toJSON();
      const publishEndDate = nowHundred.toJSON();
      apiService
        .onGetProjectByCategory(
          this.categoryActive,
          this.limit,
          this.offset,
          publishStartDate,
          publishEndDate
        )
        .then(res => {
          console.log(res);
          this.project = res.data.resultData;
          this.rowCount = res.data.rowCount;
          for (let item of this.project) {
            // let endDate = moment(item.donateEndDate);
            // let today = moment();
            // item["remain"] = endDate.diff(today, "d") + 1;
            let oneDay = 24 * 60 * 60 * 1000;
            let endDate = new Date(item.donateEndDate);
            let today = new Date(new Date());
            item["remain"] = Math.ceil((endDate - today) / oneDay);
          }
          this.rowCount = res.data.rowCount;
          this.pageLength = Math.ceil(
            Number(this.rowCount / conf.project.contentPerPage)
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    reqGetCategorys() {
      apiService
        .onGetCategory()
        .then(res => {
          console.log("reqGetCategorys ->", res);
          this.category = res.data.resultData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkDisabledProject(startDate, endDate) {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      if (now >= start && now <= end) return true;
      return false;
    },
    calPercent(num1, num2) {
      if (num1 == undefined || num2 == undefined) {
        return "0%";
      }
      if (num1 == 0 && num2 == 0) {
        return "100%";
      }
      // console.log(num1, num2);
      let percent = (num1 / num2) * 100;
      return percent.toFixed(0) + "%";
    },
    nextCarousel() {
      this.$refs.carousel.next();
    },
    prevCarousel() {
      this.$refs.carousel.prev();
    },
    nextCarouselXS() {
      this.$refs.carouselXS.next();
    },
    checkLengthProjectName(projectName) {
      if (projectName.length > 60) return true;
      return false;
    },
    checkHintImg(startDate, endDate, donate, target) {
      let statusTimeDonate = this.checkDisabledProject(startDate, endDate);
      let statusAmountDonate;
      donate >= target
        ? (statusAmountDonate = true)
        : (statusAmountDonate = false);
      if (!statusTimeDonate) {
        return 2;
      } else if (statusTimeDonate && statusAmountDonate) {
        return 1;
      } else {
        return 0;
      }
    },
    setDateTimeHint(procressDate) {
      if (!procressAt) return;
      console.log(procressAt);
      if (this.donationList.length == 0) return;
      let nowDate = new Date().getTime();
      let procressAt = new Date(procressDate).getTime();
      console.log(procressAt);
      let word = "";
      let y = Math.floor(
        (nowDate - procressAt) / 1000 / 60 / 60 / 24 / 30 / 365
      );
      let mo = Math.floor((nowDate - procressAt) / 1000 / 60 / 60 / 24 / 30.5);
      let d = Math.floor((nowDate - procressAt) / 1000 / 60 / 60 / 24);
      let h = Math.floor((nowDate - procressAt) / 1000 / 60 / 60);
      let mi = Math.floor((nowDate - procressAt) / 1000 / 60);
      let s = Math.floor((nowDate - procressAt) / 1000);
      if (y >= 1) word = `ได้รับบริจาค ${y} ปีที่แล้ว`;
      else if (mo >= 1) word = `ได้รับบริจาค ${mo} เดือนที่แล้ว`;
      else if (d >= 1) word = `ได้รับบริจาค ${d} วันที่แล้ว`;
      else if (h >= 1) word = `ได้รับบริจาค ${h} ชั่วโมงที่แล้ว`;
      else if (mi >= 1) word = `ได้รับบริจาค ${mi} นาทีที่แล้ว`;
      else word = `ได้รับบริจาค ${s} วินาทีที่แล้ว`;
      console.log(word);
      return word;
    }
  },
  filters: {
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
      const a = value.toFixed(2);
      const b = a.split(".");
      const decimal = b[1];
      return num.toString() + "." + decimal.toString();
    },
    formatDateRemain(value) {
      if (Number(value) < 0) {
        return 0;
      } else {
        return value;
      }
    },
    formatDateDonatePass(value) {
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
      if (y >= 1) return `ได้รับบริจาค ${y} ปีที่แล้ว`;
      else if (mo >= 1) return `ได้รับบริจาค ${mo} เดือนที่แล้ว`;
      else if (d >= 1) return `ได้รับบริจาค ${d} วันที่แล้ว`;
      else if (h >= 1) return `ได้รับบริจาค ${h} ชั่วโมงที่แล้ว`;
      else if (mi >= 1) return `ได้รับบริจาค ${mi} นาทีที่แล้ว`;
      return `ได้รับบริจาค ${s} วินาทีที่แล้ว`;
    },
    pipeHintTime(procressDate) {
      if (!procressDate) return "";
      let nowDate = new Date().getTime();
      let procressAt = new Date(procressDate).getTime();
      let y = Math.floor(
        (nowDate - procressAt) / 1000 / 60 / 60 / 24 / 30 / 365
      );
      let mo = Math.floor((nowDate - procressAt) / 1000 / 60 / 60 / 24 / 30.5);
      let d = Math.floor((nowDate - procressAt) / 1000 / 60 / 60 / 24);
      let h = Math.floor((nowDate - procressAt) / 1000 / 60 / 60);
      let mi = Math.floor((nowDate - procressAt) / 1000 / 60);
      let s = Math.floor((nowDate - procressAt) / 1000);
      let word = "";
      if (y >= 1) word = `ได้รับบริจาค ${y} ปีที่แล้ว`;
      else if (mo >= 1) word = `ได้รับบริจาค ${mo} เดือนที่แล้ว`;
      else if (d >= 1) word = `ได้รับบริจาค ${d} วันที่แล้ว`;
      else if (h >= 1) word = `ได้รับบริจาค ${h} ชั่วโมงที่แล้ว`;
      else if (mi >= 1) word = `ได้รับบริจาค ${mi} นาทีที่แล้ว`;
      else word = `ได้รับบริจาค ${s} วินาทีที่แล้ว`;
      return word;
    }
  }
};
</script>

<style scoped>
.c-sliding-pagination {
  text-align: center;
  margin: 1.5em 0;
}
.c-sliding-pagination__page {
  color: #000;
}
.windwalk {
  opacity: 0;
}
.text-control {
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  margin-bottom: 5px;
}
.img-sort5 {
  width: 50px;
  height: 50px;
}
.img-sort5 img {
  max-height: 50px !important;
  display: initial !important;
  width: auto !important;
}
.main-container-4 .person-img {
  height: 300px;
}

.block-img {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.block-img img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  max-width: inherit;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.person-img img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  max-width: inherit;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.main-container-4 .person-content h3 {
  letter-spacing: inherit;
}
.person-content {
  overflow: hidden;
  word-wrap: break-word;
  height: 151px;
}

.disable-btn {
  background-color: rgba(0, 0, 0, 0.12) !important;
  color: rgba(0, 0, 0, 0.26) !important;
  cursor: inherit !important;
  user-select: none;
}
.control-tooltip {
  width: 350px;
}
.col-lg-4.safari,
.col-md-4.safari {
  max-width: 33%;
}
.total-donate {
  position: absolute;
  color: #ffffff;
  font-size: 18px;
  top: 46%;
  width: 100%;
  padding: 0 5%;
  user-select: none;
}
.total-donate .target {
  background: #f47932d1;
  padding: 4px 50px;
  width: 100%;
  transform: rotate(-30deg);
}
.total-donate .time {
  background: #cececea8;
  padding: 4px 50px;
  width: 100%;
  transform: rotate(-30deg);
}
.bd-block-project {
  overflow: hidden;
  border: solid 1px #cececea8;
  box-shadow: 1px 1px 5px 0px lightgrey;
}
.un-project-img {
  border-bottom: solid 1px #cececea8;
  overflow: hidden;
}
.bd-block-project.col-xs-12 {
  padding: 0 0;
}
.pad-block-project {
  padding: 0 10px;
}
.main-container-4 .person-content h3 {
  margin-top: 15px;
}
.time-donate {
  position: absolute;
  background: #f47932d1;
  bottom: 10px;
  right: 10px;
  color: #ffffff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 25px;
  user-select: none;
}
@media screen and (max-width: 767px) {
  .inline-xs1 {
    width: 25%;
    display: inline-block;
  }
  .inline-xs2 {
    width: 15%;
    display: inline-block;
  }
  .inline-xs3 {
    width: 35%;
    display: inline-block;
  }
  .btn-sort5 {
    margin: 10px auto;
  }
  .block-btn-cate {
    margin: auto;
  }
  .cleaner-xs {
    clear: both;
  }
  .block-cate-xs {
    margin: auto;
  }
  .col-lg-4.safari,
  .col-md-4.safari {
    max-width: inherit;
  }
  .total-donate {
    font-size: 16px;
  }
  .total-donate .target {
    padding: 4px 5px;
  }
  .total-donate .time {
    padding: 4px 5px;
  }
  .col-xs-2.un-card {
    width: 16.66666667%;
  }
  .col-xs-3.un-card {
    width: 25%;
  }
  .col-xs-4.un-card {
    width: 33.33333333%;
  }
  .person-content {
    height: 148px;
  }
}
@media (min-width: 768px) {
  .block-btn-cate-fix {
    width: auto;
  }
  .block-btn-cate {
    width: 30%;
    margin-left: 40px;
  }
  .block-btn-cate .arrow-prev {
    left: -30px;
  }
  .block-btn-cate .arrow {
    right: -30px;
  }
  .total-donate {
    font-size: 16px;
  }
  .total-donate .target {
    padding: 4px 5px;
  }
  .total-donate .time {
    padding: 4px 5px;
  }
}
@media (min-width: 992px) {
  .block-btn-cate {
    width: 44%;
  }
  .block-btn-cate .arrow {
    right: -25px;
  }
  .block-btn-cate .arrow-prev {
    left: -25px;
  }
}
@media (min-width: 1200px) {
  .block-btn-cate {
    width: 66%;
    margin-left: 10px;
  }
  .block-btn-cate .arrow {
    right: -16px;
  }
  .block-btn-cate .arrow-prev {
    left: -14px;
  }
  .total-donate {
    font-size: 18px;
  }
  .total-donate .target {
    padding: 4px 40px;
  }
  .total-donate .time {
    padding: 4px 40px;
  }
  .person-content {
    height: 140px;
  }
}
@media (min-width: 1900px) {
  .block-btn-cate {
    width: 66%;
    margin-left: 24px;
  }
  .block-btn-cate .arrow {
    right: -18px;
  }
  .block-btn-cate .arrow-prev {
    left: -18px;
  }
}
</style>
