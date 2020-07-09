<template>
  <div>
    <footer class="bg-secondary">
      <div class="footer-container">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="footer-about-info">
                <img
                  class="text-left"
                  style="margin-bottom: 20px;"
                  border="0"
                  src="../assets/images/logo-kawklai-white.png"
                  width="200"
                />

                <span class="hidden-xs">
                  <h4 class="text-anakotmai text-left">ติดต่อเรา</h4>
                  <!-- <div class="social-link footer-social-link text-left">
                        <ul>
                            <li><a href="https://www.facebook.com/"><img border="0" src="../assets/images/icon social/facebook.png" width="28" height="28"></a></li>
                            
                            <li><a href="https://www.twitter.com/" ><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/twitter.png" width="28" height="28"></a></li>
                            
                            <li><a href="https://instagram.com/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/IG.png" width="28" height="28"></a></li>
                            
                            <li><a href="https://www.youtube.com/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/youtube.png" width="28" height="28"></a></li>
                          
                            <li><a href="https://mail.google.com/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/letter.png" width="28" height="28"></a></li>
                          
                            <li><a href="https://line.me/th/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/line.png" width="28" height="28"></a></li>
                        </ul>
                  </div>-->
                  <p class="text-anakotmai text-left">
                    <br />ที่ทำการ พรรคก้าวไกล
                    <br />ชั้น 3 เลขที่ 22 ซอยเพชรเกษม 47/2
                    <br />แขวงบางแค เขตบางแค กรุงเทพมหานคร 10160
                    <br />
                    <i class="fa fa-phone" aria-hidden="true"></i>02 026 6102
                  </p>
                </span>

                <!-- xs -->
                <span class="visible-xs">
                  <h4 class="text-anakotmai">ติดต่อเรา</h4>
                  <!-- <div class="social-link footer-social-link text-left">
                        <ul>
                            <li><a href="https://www.facebook.com/"><img border="0" src="../assets/images/icon social/facebook.png" width="28" height="28"></a></li>
                            
                            <li><a href="https://www.twitter.com/" ><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/twitter.png" width="28" height="28"></a></li>
                            
                            <li><a href="https://instagram.com/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/IG.png" width="28" height="28"></a></li>
                            
                            <li><a href="https://www.youtube.com/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/youtube.png" width="28" height="28"></a></li>
                          
                            <li><a href="https://mail.google.com/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/letter.png" width="28" height="28"></a></li>
                          
                            <li><a href="https://line.me/th/"><img style="margin-left: 10px;" border="0" src="../assets/images/icon social/line.png" width="28" height="28"></a></li>
                        </ul>
                  </div>-->
                  <p class="text-anakotmai">
                    <br />ที่ทำการ พรรคก้าวไกล
                    <br />ชั้น 3 เลขที่ 22 ซอยเพชรเกษม 47/2
                    <br />แขวงบางแค เขตบางแค กรุงเทพมหานคร 10160
                    <br />
                    <i class="fa fa-phone" aria-hidden="true"></i>02 026 6102
                  </p>
                </span>
                <!-- xs -->
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 mb hidden-xs"></div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 mb safari">
              <!-- <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkawklai.thailand%2F&tabs=timeline&width=360&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=501227754077632"
                width="360"
                height="250"
                style="border:none;overflow:hidden;"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>-->
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkawklai.thailand%2F&tabs&width=360&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=501227754077632"
                width="340"
                height="130"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.col-lg-4.safari,
.col-md-4.safari {
  max-width: 33%;
}
@media screen and (max-width: 767px) {
  .col-lg-4.safari,
  .col-md-4.safari {
    max-width: inherit;
  }
}
</style>

