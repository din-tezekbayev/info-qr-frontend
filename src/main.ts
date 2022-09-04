import './assets/styles/index.css'
import './assets/styles/simple-keyboard.css'

import convertColor from 'color-convert'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import minMax from 'dayjs/plugin/minMax'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import _ from 'lodash'
import NProgress from 'nprogress'
import Vue from 'vue'
import Vuetify from 'vuetify'
import i18n from './i18n';

import App from './App.vue'
import router from './router'
import ApiService from './services/api.service'
import { StorageService } from './services/storage.service'
import store from './store'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueTheMask)

declare module 'vue/types/vue' {
  interface Vue {
    $dayjs: any,
    $api: any,
    $eventBus: any,
    $progress: any,
    $_: any,
    $storage: any,
  }
}

dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$progress = NProgress;
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$_ = _;

ApiService.init(process.env.VUE_APP_API_BASE_URL);
ApiService.setHeaders();
Vue.prototype.$api = ApiService;
Vue.prototype.$storage = StorageService;


const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#3675EE',
        red: '#E83123',
        yellow: '#FBE04B',
        green: {
          base: '#A0FCD1',
          darken1: '#72B599'
        },
        blue: {
          lighten2: '#E3F9FF',
          darken2: '#4E61B1'
        },
        purple: '#B549EF',
        gray: {
          darken3: '#E6E5E5',
          darken2: '#404040',
          darken1: '#F4F4F4',
          base: '#7F7F7F',
          lighten1: '#FAFAFA',
          lighten2: '#F5F6F7',
          lighten3: '#ADADAD',
        },
        'gray-tile': '#EAEAEA',
        'gray-primary': '#404040',
        'gray-secondary': '#707070'
      }
    }
  }
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
