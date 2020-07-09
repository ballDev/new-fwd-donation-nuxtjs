<template>
  <div class="main-container-4">
    <div class="container">
      <div class="col-md-12 col-sm-12 col-xs-12" style="background-color: white;">
        <div class="col-12">
          <h2 class="title-text text-left">พรรคก้าวไกล</h2>
        </div>
        <div class="col-md-6 col-sm-6 col-12">
          <p style="font-family:Anakotmai;color:#666666;font-size:18px;">
            ที่ทำการ พรรคก้าวไกล
            <br />ชั้น 3 เลขที่ 22 ซอยเพชรเกษม 47/2
            <br />แขวงบางแค เขตบางแค กรุงเทพมหานคร 10160
          </p>
        </div>
        <div class="col-md-6 col-sm-6 col-12">
          <div class="text-anakotmai text-left" style="color:#666666;font-size:18px;">
            <i class="fa fa-facebook-official" aria-hidden="true" style="color:#6D7278;"></i> fb.com/kawklai.thailand
            <br />
            <div style="float:left; height:18px; margin-top:4px">
              <img src="../assets/images/icon social/lineG.png" style="width: 18px;height: 18px;" />
            </div>
            <div style="float:left;margin-left:5px">
              <div>@moveforward</div>
            </div>
            <div style="clear:both"></div>
            <i class="fa fa-phone" aria-hidden="true"></i> 02 026 6102
          </div>
        </div>
      </div>
      <!-- <div class="col-md-12 col-sm-12 col-xs-12" style="background-color: white;">
        <div class="col-md-6 col-sm-6 col-xs-6">
          <p
            style="font-family:Anakotmai;color:#000000; font-size:20px;"
          >เเผนกรับเรื่องทางโทรศัพท์ Call Center</p>
          <p style="font-family:Anakotmai;color:#666666; font-size:18px;">
            <i class="fa fa-circle" aria-hidden="true" style="font-size: 10px;"></i> จันทร์-ศุกร์ 9:00 - 19:00 น.
            <br />
            <i class="fa fa-circle" aria-hidden="true" style="font-size: 10px;"></i> เสาร์ 10:00 - 17:00 น.
            <br />
            <i class="fa fa-circle" aria-hidden="true" style="font-size: 10px;"></i> หยุดทำการทุกวันอาทิตย์เเละวันหยุดนักขัตฤกษ์
          </p>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6">
          <p style="font-family:Anakotmai;color:#000000; font-size:20px;">ร้านขายของที่ระลึก</p>
          <p style="font-family:Anakotmai;color:#666666;font-size:18px;">
            <i class="fa fa-circle" aria-hidden="true" style="font-size: 10px;"></i> จันทร์-ศุกร์ 9:00 - 19:00 น.
            <br />
            <i class="fa fa-circle" aria-hidden="true" style="font-size: 10px;"></i> เสาร์ 10:00 - 17:00 น.
            <br />
            <i class="fa fa-circle" aria-hidden="true" style="font-size: 10px;"></i> หยุดทำการทุกวันอาทิตย์เเละวันหยุดนักขัตฤกษ์
          </p>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import conf from "@/config/config.json";
export default {
  name: "ContactAddress",
  created() {
    // document.title = `ติดต่อเรา - ${conf.title_project}`;
  },
  head() {
    return {
      title: `ติดต่อเรา - ${conf.title_project}`
    };
  }
};
</script>

<style scoped>
li {
  display: list-item;
}
</style>

