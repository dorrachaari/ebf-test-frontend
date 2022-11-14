import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import { refreshToken } from './auth-utils'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

const options = {
  toast: {
    position: SnotifyPosition.rightTop,
    showProgressBar: false,
    icon: false,
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    maxOnScreen: 2,
    maxAtPosition: 2,
    preventDuplicates: true,
  }
};


Vue.use(VueAxios,axios)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2);
Vue.use(Snotify, options)

// AXIOS REQUESTS INTERCEPTOR
axios.interceptors.request.use((config) => {
  var token = sessionStorage.getItem('token')
  if (token != null) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// AXIOS RESPONSES INTERCEPTOR
axios.interceptors.response.use((response) => {
return response;
}, (error) => {

  if (error == null || error.response == null) {
  return; 
}

if (error.response.status == 401) {
  return refreshToken().then( () => {
    error.config.headers.Authorization  = 'Bearer ' + sessionStorage.getItem('token');
    error.config.baseURL = undefined;
    return axios.request(error.config);
  }, () => {

      Swal.fire("Session expired !", "You will be redirected to Login Page", "warning")
      .then(() => {
        router.push({
            path:'/logout',
        });
      });
  

  });
}

if (error.response.status == 500) {
  Vue.prototype.$snotify.error('An internal server error has occured');
  return
}

if (error.response.status == 404) {
  Vue.prototype.$snotify.error('Unaivaialable Resource!');
  return
}

if (error.response && error.response.data) {
  return Promise.reject(error.response.data);
} else {
  return Promise.reject('An internal server error has occured')
}
});


