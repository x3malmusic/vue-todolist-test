import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueConfirmDialog from "vue-confirm-dialog";
import localStorage from "./mixins/localStorage";

Vue.config.productionTip = false;

Vue.mixin(localStorage);

Vue.use(VueConfirmDialog);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
