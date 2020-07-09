import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import conf from '@/config/config.json'

Vue.use(VueGoogleMaps, {
    load: {
        key: conf.api_key,
        libraries: "places"
    }
});
