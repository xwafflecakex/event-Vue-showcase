// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import Vuelidate from "vuelidate";
import Datefilter from "./filters/date";

Vue.filter("date", Datefilter);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

const requireComponent = require.context(
  //making 'base' named components global compnents
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
// import BaseIcon from '@/components/BaseIcon.vue' making base icon a global compnent manually
// Vue.component('BaseIcon', BaseIcon)

new Vue({
  router,
  store, // injecting the store.
  render: h => h(App)
}).$mount("#app");
