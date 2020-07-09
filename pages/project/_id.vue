<template>
  <div data-app>
    <MenuBar />
    <Detail />
    <Footer />
  </div>
</template>

<script>
import conf from "@/config/config.json";
import apiService from "@/services/api-services";
import utilResource from "@/services/util";
import axios from "axios";
export default {
  async asyncData({ params }) {
    const ip = `${conf.donation_api.conn_type}${conf.donation_api.ip}${conf.donation_api.port}`;
    let options = utilResource.getHeaderNoLogin();
    let { data } = await axios.get(
      `${ip}/dmf/v1/projects/${params.id}`,
      options
    );
    return { posts: data };
  },
  head() {
    return {
      title: `${this.posts.resultData.projectName.th} - ${conf.title_project}`,
      meta: [
        {
          hid: "og:url",
          property: "og:url",
          content: `${conf.donation_fe.conn_type}${conf.donation_fe.ip}${conf.donation_fe.port}/about/${this.posts.resultData._id}`
        },
        {
          hid: "og:title",
          name: "og:title",
          content: `${this.posts.resultData.projectName.th} - ${conf.title_project}`
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.posts.resultData.projectDetail.shortDescription.th
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "article"
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.posts.resultData.projectDetail.coverThumbnailUrl
        }
      ]
    };
  }
};
</script>

<style>
@import "@/assets/css/bootstrap-responsive.min.css";
@import "@/assets/css/bootstrap.css";
@import "@/assets/css/manual.css";
@import "@/assets/css/animate.css";
@import "@/assets/font-awesome-4.7.0/css/font-awesome.min.css";
</style>
